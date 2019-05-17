import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';

const url = 'http://localhost:3000/upload';

@Injectable()
export class UploadService {
  constructor(private http: HttpClient) {}

  public upload(
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
      const req = new HttpRequest('POST', url, formData, {
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
}
