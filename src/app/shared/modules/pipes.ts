import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';

import { Observable, interval } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Pipe({ name: 'datepipe', pure: true })
export class MyDatePipe extends DatePipe implements PipeTransform {
      constructor(private translate: TranslateService) {
            super(translate.currentLang);
      }

      transform(value: any, pattern?: string): string | null {
            return super.transform(value, pattern);
      }
}

@Pipe({ name: 'numberpipe' })
export class NumberPipe implements PipeTransform {

      constructor(private translate: TranslateService) {
      }

      transform(value: any, locale: string = null): string | null {
            if (value === undefined || value === null) {
                  return undefined;
            } else if (typeof(value) !== 'number') {
                  return value;
            }

            if (locale !== null) {
                  return value.toLocaleString(locale);
            } else {
                  return value.toLocaleString(this.translate.currentLang);
            }
      }
}

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({ name: 'timeAgo', pure: false})
export class TimeAgoPipe extends AsyncPipe {

      value: Date;
      timer: Observable<string>;

      constructor(
            ref: ChangeDetectorRef,
            public translate: TranslateService
      ) {
            super(ref);
      }

      transform(obj: any): any {
            if (obj instanceof Date) {
                  this.value = obj;

                  if (!this.timer) {
                  this.timer = this.getObservable();
                  }

                  return super.transform(this.timer);
            }

            return super.transform(obj);
      }

      private getObservable(): Observable<string> {
            return interval(60000).pipe(startWith(0), map(() => {
                  // time since message was sent in seconds
                  const delta = (new Date().getTime() - this.value.getTime()) / 1000;

                  // format string
                   if (delta < 60) { // sent in last minute
                        return this.translate.instant('APPLICATION.Common.Time.lessMin');
                  } else if (delta < 3600) { // sent in last hour
                        return this.translate.instant('APPLICATION.Common.Time.Helper') + ' ' + Math.floor(delta / 60) +
                        ' ' + this.translate.instant('APPLICATION.Common.Time.Mins');
                  } else if (delta < 86400) { // sent on last day
                        return this.translate.instant('APPLICATION.Common.Time.Helper') + ' ' + Math.floor(delta / 3600) +
                        ' ' + this.translate.instant('APPLICATION.Common.Time.Hours');
                  } else { // sent more than one day ago
                        return this.translate.instant('APPLICATION.Common.Time.Helper') + ' ' + Math.floor(delta / 86400) +
                        ' ' + this.translate.instant('APPLICATION.Common.Time.Days');
                  }
            }));
      }
}


@Pipe({ name: 'highlight' })
export class HighlightSearch implements PipeTransform {

      markStart: string;
      markEnd: string;

      constructor() {
            // this.markStart = `<span style="background-color: transparent; color: blue; font-weight: 600;">`;
            this.markStart = `<span class="highlight">`;
            this.markEnd = '</span>';

            // this.markStart = `<mark>`;
            // this.markEnd = '</mark>';
      }

      transform(value: any, args: any): any {
            if (!args) {
                  return value;
            } else {
                  // 'gi' insensitive and 'g' sensitive.
                  switch (typeof(args)) {
                        case 'string':
                        return value.replace(new RegExp(args, 'gi'), this.markStart + args + this.markEnd);
                        case 'object':
                        args.forEach((word: string) => {
                              value = value.replace(new RegExp(word, 'g'), this.markStart + word + this.markEnd);
                        });
                        console.log(value)
                        return value;
                        default:
                        return value;
                  }
            }
      }
}
