import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Subject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FilePreviewDialogComponent } from 'src/app/modules/application/components/common-components/attachments-selector/file.preview.dialog.component';

@Injectable()
export class UploadService {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog
  ) {}

  upload(
    destination: 'cardAttachment' | 'projectAttachment' | 'avatar',
    destId: number,
    files: Set<File>
  ): { [key: string]: { progress: Observable<number>, error: boolean } } {
    // this will be the our resulting map
    const status: { [key: string]: { progress: Observable<number>, error: boolean } } = {};

    files.forEach(file => {
      // create a new multipart-form for every file
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      // create a http-post request and pass the form
      // tell it to report the upload progress
      const req = new HttpRequest('POST', environment.server.url + '/api/upload' + '?id=' + destId, formData, {
        reportProgress: true
      });

      // create a new progress-subject for every file
      const progress = new Subject<number>();

      // send the http-request and subscribe for progress-updates

      const startTime = new Date().getTime();
      this.http.request(req).subscribe(
        event => {
          if (event.type === HttpEventType.UploadProgress) {
            progress.next(Math.round((100 * event.loaded) / event.total));
          } else if (event instanceof HttpResponse) {
            // Close the progress-stream if we get an answer form the API
            progress.complete();
          }
        },
        error => {
          progress.error(error);
          status[file.name].error = true;
      });

      // Save every progress-observable in a map of all observables
      status[file.name] = {
        progress: progress.asObservable(),
        error: false
      };
    });

    // return the map of progress.observables
    return status;
  }

  download(value: string, type: string) {
    const params = 'value=' + value + '&type=' + type;

    this.http.get(environment.server.url + '/api/download?' + params, {responseType: 'blob' as 'json'}).subscribe(
      (response: any) => {
        console.log(response);

        if (!type.startsWith('image')) {
          const dataType = response.type;
          const binaryData = [];
          binaryData.push(response);
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
          if (value) {
              downloadLink.setAttribute('download', value);
          }
          document.body.appendChild(downloadLink);
          downloadLink.click();
        } else {
          let url;
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            url = reader.result;
            console.log(url)
            this.dialog.open(FilePreviewDialogComponent, {
              panelClass: 'noborder-dialog-container',
              data: { url: url }
          })
          }, false);

          if (response) {
            console.log(2)
            reader.readAsDataURL(response);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
