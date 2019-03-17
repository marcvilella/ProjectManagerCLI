import { Component } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry, MatSnackBar, MatDialog } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Store, select } from '@ngrx/store';

//Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

//
import { IAppState } from '../../shared/store/state/app.state';
import { GetUsers } from '../../shared/store/actions/user.actions';
import { selectUserList } from '../../shared/store/selectors/user.selectors';
import { User, IUser } from '../../shared/models/user' 
import { BoardCreateDialog } from './components/board.create.component';
import { selectBoardList, selectSelectedBoard } from 'src/app/shared/store/selectors/board.selectors';
import { GetBoards, GetBoard } from 'src/app/shared/store/actions/board.actions';
import { IBoard } from 'src/app/shared/models/boards';
import { Observable } from 'rxjs';

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
  isExpanded: boolean;
  element: HTMLElement;
  user: User;

  constructor(
    private router: Router, 
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer, 
    public translate: TranslateService, 
    private userAuth: AuthService, 
    public snackBar: MatSnackBar, 
    private _store: Store<IAppState>,
    public dialog: MatDialog,
    public overlay: Overlay){

      this.isExpanded = false;
      
      let decoded = userAuth.getTokenData();
      if(decoded == null)
        this.router.navigate(['../auth/log-in']);
      this.user = new User(decoded.sub, decoded.name, decoded.surname, decoded.name + ' ' + decoded.surname, decoded.email, '', decoded.role, '');

      this.users$ = this._store.pipe(select(selectUserList));
      this.boards$ = this._store.pipe(select(selectBoardList));

      this._store.dispatch(new GetUsers());
      this._store.dispatch(new GetBoards());
      this._store.dispatch(new GetBoard(Number('xxx')));

      //#region SVG 
      iconRegistry.addSvgIcon(
        'star-border',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/star-border-icon.svg')
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
        'recent',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/recent-icon.svg')
      );
      iconRegistry.addSvgIcon(
        'star',
        sanitizer.bypassSecurityTrustResourceUrl('assets/svg/star-icon.svg')
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

      //#endregion

      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
      });
  }

  toggleActive(event:any){
    event.preventDefault();
    if(this.element !== undefined){
      this.element.style.backgroundColor = "gray";
      this.isExpanded = false;
    } 
    var target = event.currentTarget;
    target.style.backgroundColor = "#e51282";
    this.element = target;
  }

  openDialog(): void {
    let newBoardDialog = this.dialog.open(BoardCreateDialog, {
      position: {top: '40px'},
      panelClass: 'form-dialog-container',
    });
  }

  selectBoard(board: IBoard): void{
    console.log(board);
    this._store.dispatch(new GetBoard(board._id));
  }

  logOut(){

    this.userAuth.logOut(this.user._id).subscribe(
      response => {
        localStorage.removeItem('access_token');
        this.router.navigate(['../auth/log-in']);
      },
      error => {
        this.snackBar.open(this.translate.instant("SERVER.Internal-error"), "", {duration: 5000});
        this.snackBar.open(error, '', {duration: 10000});
      }
    );
  }

  onLanguageChange(lang: string){
      localStorage.setItem('language', lang)
      this.translate.use(lang)
  }

}
