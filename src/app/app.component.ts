import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {  

  constructor(private translate: TranslateService, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {  

    iconRegistry.addSvgIcon(
      'business',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/business-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'email',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/email-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/phone-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'user',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/user-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'vpn_key',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/vpn_key-icon.svg')
    );
    iconRegistry.addSvgIcon(
      'list',
      sanitizer.bypassSecurityTrustResourceUrl('assets/svg/list-icon.svg')
    );
    
  }
  
}
