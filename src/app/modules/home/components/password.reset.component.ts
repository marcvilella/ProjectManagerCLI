import { Component,  ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatDialog } from '@angular/material'
import { buttonLabelTranslateX, buttonSpinnerTranslateX, computeButtonTranslateX } from '../../../shared/modules/animations';
import { AuthService } from '../../../shared/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LanguagesList } from '../../../shared/services/languages';
import { AuthDialog } from './auth.dialog.component';

@Component({
    selector: 'password-reset',
    templateUrl: '../views/password.reset.html',
    styleUrls: ['../home.component.scss', '../../../app.component.scss'],
    animations: [
        buttonLabelTranslateX,
        buttonSpinnerTranslateX
    ]
})

export class PasswordResetComponent{

    //#region Properties

    languageSelected: string;    
    languages = LanguagesList;
    token: string;
    
    //#endregion

    //#region FormControls

    passwordFormControl = new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,20})/)
    ]);
    confirmPasswordFormControl = new FormControl('', [
            Validators.required,
            matchingPasswordsValidator(this.passwordFormControl)
    ]);

    request: boolean = false;
    @ViewChild('buttonLabel') buttonLabel: ElementRef;
    labelTransform: number;
    spinnerPadding: number;

    //#endregion
    
    //#region Constructor

    constructor(private userAuth: AuthService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog, public translate: TranslateService, private jwtHelper: JwtHelperService) {
        
        this.languageSelected = translate.currentLang;

        this.route.queryParams.subscribe(params => {
            this.token = params.id;
        });

        if(this.token == undefined || this.jwtHelper.isTokenExpired(this.token))
            this.snackBar.open(this.translate.instant("SERVER.Token-PasswordReset-error"), "", {duration: 5000});
        
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              (<any>window).ga('set', 'page', event.urlAfterRedirects);
              (<any>window).ga('send', 'pageview');
            }
        });
    }

    //#endregion

    //#region Functions

    onSubmit(){

        if(!this.passwordFormControl.valid || !this.confirmPasswordFormControl.valid)
            return;

        //Update current width and trigger animation
        let widths = computeButtonTranslateX(320, this.buttonLabel.nativeElement.clientWidth)
        this.labelTransform = widths[0];
        this.spinnerPadding = widths[1];

        //Trigger animation
        this.request = true;

        this.userAuth.setResetPassword(this.token, this.passwordFormControl.value).subscribe(
            response => {
                this.request = false;

                this.snackBar.open(this.translate.instant("HOME.PasswordReset.WarningDialog.Content"), "", {duration: 5000});
                this.router.navigate(['../auth/log-in']);

            },
            error => {
                this.request = false;

                switch(error.status){
                    case 403:
                        this.snackBar.open(this.translate.instant("SERVER.Token-PasswordReset-error"), "", {duration: 5000});    
                    break;
                    case 404:
                        this.passwordFormControl.setErrors({notMatch: true});
                    break;
                    default:
                        this.snackBar.open(this.translate.instant("SERVER.Internal-error"), "", {duration: 5000});
                    break;
                }
            }
        );
        
    }

    onLanguageChange(lang: string){
        localStorage.setItem('language', lang)
        this.translate.use(lang)
    }

    //#endregion

}

function matchingPasswordsValidator( passwordToCompare:FormControl ): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
        if (control.value !== passwordToCompare.value) {
            return { 'errorMatchingPasswords': true };
        }
        return null;
    };
}