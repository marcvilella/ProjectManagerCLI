import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from '../../../shared/services/auth.service'
import { Title } from '@angular/platform-browser';

@Component({
      selector: 'auth-dialog',
      templateUrl: '../views/auth.dialog.html',
      styles: ['.line-breaker { white-space: pre-line; }']
    })
    export class AuthDialog {
    
      // MODES
      // 0 -> Warning message (sending verification or email)
      // 1 -> Verification Process and animation (Verification check)

      title: string;
      content: string;
      params: Array<object>;

      constructor( public dialogRef: MatDialogRef<AuthDialog>, public translate: TranslateService, private userAuth: AuthService, 
        @Inject(MAT_DIALOG_DATA) public data: { mode: number, title: string, content:string, params:object[] }) {

            this.title = this.data.title;//this.translate.instant(this.data.initial + ".Title");
            this.content = this.data.content//this.translate.instant(this.data.initial + ".Content");
            this.params = this.data.params;

            if(this.data.mode == 1){
              this.userAuth.verifyEmail(JSON.stringify(this.params[0]));
            }
        }
  }