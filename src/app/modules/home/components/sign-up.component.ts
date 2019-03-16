import { Component, ElementRef, ViewChild, Inject } from '@angular/core';
import { FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { buttonLabelTranslateX, buttonSpinnerTranslateX, computeButtonTranslateX } from '../../../shared/modules/animations'
import { AuthService } from '../../../shared/services/auth.service'
import { MatSnackBar, MatDialog } from '@angular/material'

import { LanguagesList } from '../../../shared/models/languages';
import { AuthDialog } from './auth.dialog.component';

@Component({
    selector: 'sign-up',
    templateUrl: '../views/sign-up.html',
    styleUrls: ['../home.component.scss', '../../../app.component.scss'],
    animations: [
        buttonLabelTranslateX,
        buttonSpinnerTranslateX
    ]
})

export class SignUpComponent{

    //#region Properties

    languageSelected: string;    
    languages = LanguagesList;

    //#endregion
    
    //#region FormControls
    nameFormControl = new FormControl('', [Validators.required]);
    surnameFormControl = new FormControl('', [Validators.required]);
    @ViewChild('email') emailElement: ElementRef;
    emailFormControl = new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/)
    ]);
    companyFormControl = new FormControl('', [Validators.required]);
    passwordFormControl = new FormControl('',[
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,20})/)
    ]);
    confirmPasswordFormControl = new FormControl('', [
            Validators.required,
            matchingPasswordsValidator(this.passwordFormControl)
    ]);
    termsAccepted:boolean;

    request: boolean = false;
    @ViewChild('buttonLabel') buttonLabel: ElementRef;
    labelTransform: number;
    spinnerPadding: number;
    //#endregion

    //#region Constructor

    constructor(private userAuth: AuthService, private router: Router, public snackBar: MatSnackBar, public dialog: MatDialog, public translate: TranslateService) {
        this.languageSelected = translate.currentLang;

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              (<any>window).ga('set', 'page', event.urlAfterRedirects);
              (<any>window).ga('send', 'pageview');
            }
        });
    }

    //#endregion
    
    //#region Functions

    termsChange(){
        if(this.termsAccepted == null)
            this.termsAccepted = true;
        else
            this.termsAccepted = !this.termsAccepted;
    }    

    onSubmit(){

        if(this.termsAccepted == null)
            this.termsAccepted = false;

        if(!this.nameFormControl.valid || !this.surnameFormControl.valid || !this.companyFormControl.valid || !this.emailFormControl.valid || !this.passwordFormControl.valid || !this.confirmPasswordFormControl.valid || !this.termsAccepted)
            return;

        //Update current width and trigger animation
        let widths = computeButtonTranslateX(320, this.buttonLabel.nativeElement.clientWidth)
        this.labelTransform = widths[0];
        this.spinnerPadding = widths[1];

        //Trigger animation
        this.request = true;        

        this.userAuth.signUp( this.nameFormControl.value, this.surnameFormControl.value, this.emailFormControl.value, this.companyFormControl.value, this.languages.find(m => m.file == this.languageSelected).file, this.passwordFormControl.value ).subscribe(
            response => {
                this.request = false;

                //Sign Up Dialog for confirmation email
                this.dialog.open(AuthDialog, {
                    width: '500px',
                    data: {
                        mode: 0,
                        title: this.translate.instant("HOME.SignUp.WarningDialog.Title"),
                        content: this.translate.instant("HOME.SignUp.WarningDialog.Content")
                    }
                }).afterClosed().subscribe(
                    () => {this.router.navigate(['../auth/log-in'])
                });
            },
            error => {
                this.request = false;

                switch(error.status){
                    case 400:
                        //Delete data of the wrong field and select it, also show error
                        if( JSON.parse(error._body).message.charAt(0) == 1)
                            this.emailFormControl.setErrors({pattern: true});
                        else{
                            this.passwordFormControl.setErrors({pattern: true});
                            this.confirmPasswordFormControl.reset();
                            this.confirmPasswordFormControl.setErrors(null);
                        }
                    break;
                    case 401:
                        this.emailFormControl.setErrors({notUnique: true});
                    break;
                    case 409:
                        //All parameters needed
                        this.snackBar.open(this.translate.instant("SERVER.Parameter-missing"), "", {duration: 5000});
                    break; 
                    default:
                        this.snackBar.open(this.translate.instant("SERVER.Internal-error"), "", {duration: 5000});
                    break;
                }
            }
        )
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