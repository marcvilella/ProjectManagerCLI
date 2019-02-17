import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'

import { AuthService } from '../../../shared/services/auth.service'

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
      params: any;

      constructor( public dialogRef: MatDialogRef<AuthDialog>, private userAuth: AuthService, 
        @Inject(MAT_DIALOG_DATA) public data: { mode: number, title: string, content:string, params:any }) {

          console.log(this.data)
            this.title = this.data.title;
            this.content = this.data.content
            this.params = this.data.params;

            if(this.data.mode == 1){
              let cont = this.content;
              this.content = "";
              //Create loading
              this.userAuth.verifyEmail(JSON.stringify(this.params)).subscribe(
                response => {
                  this.content = cont; 
                },
                error => {}
              );

              
            }
        }
  }