import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';

import { CalendarEvent } from 'angular-calendar';
import {
      isSameMonth,
      isSameDay,
      startOfMonth,
      endOfMonth,
      startOfWeek,
      endOfWeek,
      startOfDay,
      endOfDay,
      format
    } from 'date-fns';

import { ICardItem } from 'src/app/shared/models/boards';
import { IAppState } from 'src/app/shared/store/state/app.state';
import { Store, select } from '@ngrx/store';
import { selectAllCardItemsItems } from 'src/app/shared/store/selectors/board.selectors';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-calendar',
    templateUrl: '../views/calendar.html',
    styleUrls: ['../application.component.scss', '../../../app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarComponent implements OnInit {

      //#region Properties
      view: string = 'month';

      viewDate: Date = new Date();

      events$: Observable<Array<CalendarEvent<{ card: ICardItem }>>>;

      activeDayIsOpen = false;
      //#endregion

      //#region Constructor

      constructor(
            private router: Router,
            private _store: Store<IAppState>) {

            // this.view = 'month';

            this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                  (<any>window).ga('set', 'page', event.urlAfterRedirects);
                  (<any>window).ga('send', 'pageview');
            }
            });
      }

      ngOnInit(): void {
            this.fetchEvents();
      }

      //#endregion

      //#region Functions

      getTimezoneOffsetString(date: Date): string {
            const timezoneOffset = date.getTimezoneOffset();
            const hoursOffset = String(
            Math.floor(Math.abs(timezoneOffset / 60))
            ).padStart(2, '0');
            const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
            const direction = timezoneOffset > 0 ? '-' : '+';

            return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
      }

      fetchEvents(): void {
            this.events$ = this._store.pipe(select(selectAllCardItemsItems)).pipe(map((results: ICardItem[]) => {
                  return results.map((card: ICardItem) => {
                        return {
                        title: card.name,
                        start: new Date(
                              card.modifiedAt
                        ),
                        color: {
                              primary: '#e3bc08',
                              secondary: '#FDF1BA'
                        },
                        allDay: true,
                        meta: {
                              card
                        }
                        };
                  });
            }));
      }

      dayClicked({
            date,
            events
          }: {
            date: Date;
            events: Array<CalendarEvent<{ card: ICardItem }>>;
          }): void {
            this.events$.subscribe(m => console.log(m));
            if (isSameMonth(date, this.viewDate)) {
                  if (
                        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
                        events.length === 0
                  ) {
                        this.activeDayIsOpen = false;
                  } else {
                        this.activeDayIsOpen = true;
                        this.viewDate = date;
                  }
            }
      }

      //#endregion

}
