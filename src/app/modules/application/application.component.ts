import { Component, ViewChild } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'application-root',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  
  @ViewChild('sidenav') sidenav: MatSidenav;
  opened: boolean;

  constructor(private router: Router){

    this.opened = true;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }
    });
  }

  close() {
    this.sidenav.close();
  }

}
