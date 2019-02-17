import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Router, NavigationEnd } from '@angular/router';
import { MatIconRegistry, MatSnackBar } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

//Services
import { AuthService } from 'src/app/shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';

//
import { User } from '../../shared/models/user' 

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

  isExpanded: boolean;
  element: HTMLElement;
  user: User;

  constructor(private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, public translate: TranslateService, private userAuth: AuthService, public snackBar: MatSnackBar){

    this.isExpanded = false;
    
    let decoded = userAuth.getTokenData();
    if(decoded == null)
      this.router.navigate(['../auth/log-in']);
    this.user = new User(decoded.sub, decoded.name, decoded.surname, decoded.name + ' ' + decoded.surname, decoded.email, '', decoded.role, '');

    //#region SVG

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

  logOut(){

    this.userAuth.logOut(this.user.id).subscribe(
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
