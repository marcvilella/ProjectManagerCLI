import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry, MatSnackBar, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

// Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

//
import { IAppState } from '../../shared/store/state/app.state';
import { GetCurrentUser } from '../../shared/store/actions/user.actions';
import { selectAllUsersItems, selectCurrentUser } from '../../shared/store/selectors/user.selectors';
import { IUser } from '../../shared/models/user';
import { BoardCreateDialogComponent } from './components/board-components/board-creator-dialog/board.create.dialog.component';
import { selectAllBoardsItems } from 'src/app/shared/store/selectors/board.selectors';
import { GetBoards, GetBoard } from 'src/app/shared/store/actions/board.actions';
import { IBoard } from 'src/app/shared/models/boards';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'application-root',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations: [
    trigger('onSideNavChange', [
      state('false',
        style({
          'width': '59px'
        })
      ),
      state('true',
        style({
          'width': '150px'
        })
      ),
      transition('false => true', animate('250ms ease-in')),
      transition('true => false', animate('250ms ease-in')),
    ])
  ]
})
export class ApplicationComponent {

  users$: Observable<IUser[]>;
  boards$: Observable<IBoard[]>;
  boardsRecent$: Observable<IBoard[]>;
  boardsStarred$: Observable<IBoard[]>;
  boardsPersonal$: Observable<IBoard[]>;
  boardsProject$: Observable<IBoard[]>;

  boardSearcher: FormControl;

  isExpanded: boolean;
  element: HTMLElement;
  user: IUser;

  constructor(
    private router: Router,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    public translate: TranslateService,
    private userAuth: AuthService,
    public snackBar: MatSnackBar,
    private _store: Store<IAppState>,
    public dialog: MatDialog) {

      this.isExpanded = false;

      const decoded = userAuth.getTokenData();
      if (decoded == null) {
        this.router.navigate(['../auth/log-in']);
      }

      this._store.pipe(select(selectCurrentUser())).subscribe((user: IUser) => {
        if (user !== undefined) {
          this.user = user;
        } else {
          this.user = {
            _id: decoded.sub, name: decoded.name, surname: decoded.surname, fullname: decoded.name + ' ' + decoded.surname, email: decoded.email,
            phone: null, image: null, boards: null , company: null, position: null, password: null, tempRole: null
          };
        }
      });

      this.boardSearcher = new FormControl('');
      this.users$ = this._store.pipe(select(selectAllUsersItems));
      this.boards$ = this._store.pipe(select(selectAllBoardsItems));
      this.boardSearcherUpdated();


      this._store.dispatch(new GetBoards());
      this._store.dispatch(new GetCurrentUser());

      //#region SVG

      iconRegistry.addSvgIcon(
        'priority',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/priority-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'search',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/search-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'close',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/close-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'visibility',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/visibility-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'visibility-outlined',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/visibility-outlined-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'visibility-off',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/visibility-off-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'delete',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/delete-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'description',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/description-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'checklist',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/checklist-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'timesheet',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/timesheet-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'comment',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/comment-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'comment-outlined',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/comment-outlined-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'timeline',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/timeline-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'shared',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/shared-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'public',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/public-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'private',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/private-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'check',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/check-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'check-outlined',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/check-outlined-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'recent',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/recent-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'star',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/star-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'star-border',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/star-border-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'calendar',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/calendar-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'time',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/time-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'time-outlined',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/time-outlined-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'support',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/support-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'list',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/list-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'dashboard',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/dashboard-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'boards',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/boards-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'todo',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/todo-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'settings',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/settings-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'menu',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/menu-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'edit',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/edit-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'add',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/add-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'archive',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/archive-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'done',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/done-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'attachment',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/attachment-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'circle',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/circle-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'before',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/before-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'next',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/next-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'project',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/project-icon.svg')
      );

      //#endregion

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
  }

  toggleActive(event: any) {
    event.preventDefault();
    if (this.element !== undefined) {
      this.element.style.backgroundColor = 'gray';
      this.isExpanded = false;
    }
    const target = event.currentTarget;
    target.style.backgroundColor = '#e51282';
    this.element = target;
  }

  openDialog(): void {
    this.dialog.open(BoardCreateDialogComponent, {
      position: {top: '40px'},
      panelClass: 'form-dialog-container'
    });
  }

  boardSearcherUpdated() {
    this.boardsStarred$ = this.boards$.pipe(map(boards => boards.filter(m => m.settings.starred && m.name.match(new RegExp(this.boardSearcher.value, 'i')))));
    this.boardsRecent$ = this.boards$.pipe(map(boards => boards.filter(m => m.name.match(new RegExp(this.boardSearcher.value, 'i')))));
    this.boardsPersonal$ = this.boards$.pipe(map(boards => boards.filter(m => m.settings.mode === 'private' && m.name.match(new RegExp(this.boardSearcher.value, 'i')))));
    this.boardsProject$ = this.boards$.pipe(map(boards => boards.filter(m => m.settings.mode === 'shared' && m.name.match(new RegExp(this.boardSearcher.value, 'i')))));
  }

  logOut() {

    this.userAuth.logOut(this.user._id).subscribe(
      response => {
        localStorage.removeItem('access_token');
        this.router.navigate(['../auth/log-in']);
      },
      error => {
        this.snackBar.open(this.translate.instant('SERVER.Internal-error'), '', {duration: 5000});
        this.snackBar.open(error, '', {duration: 10000});
      }
    );
  }

  onLanguageChange(lang: string) {
      localStorage.setItem('language', lang);
      this.translate.use(lang);
  }

}
