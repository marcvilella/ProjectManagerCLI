import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'home-root',
  templateUrl: './home.component.html',
  styleUrls: []
})
export class HomeComponent {
  

  constructor(private router: Router, private translate: TranslateService) {
    this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          (<any>window).ga('set', 'page', event.urlAfterRedirects);
          (<any>window).ga('send', 'pageview');
        }
    });
  }

}
