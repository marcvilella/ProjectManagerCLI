import { Component,  ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { buttonLabelTranslateX, buttonSpinnerTranslateX, computeButtonTranslateX } from '../../../shared/modules/animations';
import { AuthService } from '../../../shared/services/auth.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { JwtHelperService } from '@auth0/angular-jwt';

import { LanguagesList } from '../../../shared/models/languages';
import { AuthDialog } from './auth.dialog.component';

@Component({
    selector: 'log-in',
    templateUrl: '../views/log-in.html',
    styleUrls: ['../home.component.scss', '../../../app.component.scss'],
    animations: [
        buttonLabelTranslateX,
        buttonSpinnerTranslateX
    ]
})

export class LogInComponent{

    //#region Properties

    languageSelected: string;    
    languages = LanguagesList;

    //#endregion
    
    //#region FormControls

    @ViewChild('email') emailElement: ElementRef;
    emailFormControl = new FormControl('', 
    {
        validators: [
            Validators.required,
            Validators.pattern(/^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/)
        ],
        updateOn: "blur"
    });
    @ViewChild('password') passwordElement: ElementRef;
    passwordFormControl = new FormControl('',
    {
        validators: [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[_!@#\$%\^&\*])(?=.{8,20})/)
        ],
        updateOn: "blur"
    });

    request: boolean = false;
    @ViewChild('buttonLabel') buttonLabel: ElementRef;
    labelTransform: number;
    spinnerPadding: number;
    //#endregion
    
    //#region Constructor

    constructor(private userAuth: AuthService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar, public dialog: MatDialog, public translate: TranslateService, private jwtHelper: JwtHelperService) {
        this.languageSelected = translate.currentLang;

        let token: string;
        this.route.queryParams.subscribe(params => {
            token = params.id;
        });

        if(token != undefined && !this.jwtHelper.isTokenExpired(token))
            this.dialog.open(AuthDialog, {
                width: '500px',
                data: {
                    mode: 1,
                    title: this.translate.instant("HOME.LogIn.WarningDialog.Title"),
                    content: this.translate.instant("HOME.LogIn.WarningDialog.Content"),
                    params: token,
                }
            });

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              (<any>window).ga('set', 'page', event.urlAfterRedirects);
              (<any>window).ga('send', 'pageview');
            }
        });
    }

    //#endregion

    //#region Function

    onSubmit(){

        if(!this.emailFormControl.valid  || !this.passwordFormControl.valid)
            return;

        //Update current width and trigger animation
        let widths = computeButtonTranslateX(320, this.buttonLabel.nativeElement.clientWidth)
        this.labelTransform = widths[0];
        this.spinnerPadding = widths[1];

        //Trigger animation
        this.request = true;

        this.userAuth.logIn(this.emailFormControl.value, this.passwordFormControl.value).subscribe(
            response => {
                this.request = false;
                this.userAuth.setToken(response.token);
                this.router.navigate(['../app']);
            },
            error => {
                this.request = false;

                switch(error.status){
                    case 400:
                        //this.passwordFormControl.reset();
                        this.passwordFormControl.setErrors({notMatch: true})
                    break;
                    case 403:
                        //Email still not verfied
                        //TODO: Resent email
                        this.dialog.open(AuthDialog, {
                            width: '500px',
                            data: {
                                mode: 0,
                                title: this.translate.instant("HOME.LogIn.RequestDialog.Title"),
                                content: this.translate.instant("HOME.LogIn.RequestDialog.Content"),
                                params: this.translate.instant("HOME.LogIn.RequestDialog.Url"),
                            }
                        });
                    break;
                    case 404:
                        this.emailFormControl.setErrors({notMatch: true});
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