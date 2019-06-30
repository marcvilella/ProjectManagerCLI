import { Component,  ElementRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { TranslateService } from '@ngx-translate/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { buttonLabelTranslateX, buttonSpinnerTranslateX, computeButtonTranslateX } from '../../../shared/modules/animations';
import { AuthService } from '../../../shared/services/auth.service';

import { LanguagesList } from '../../../shared/models/languages';
import { AuthDialog } from './auth.dialog.component';

@Component({
    selector: 'request-password',
    templateUrl: '../views/request.password.html',
    styleUrls: ['../home.component.scss', '../../../app.component.scss'],
    animations: [
        buttonLabelTranslateX,
        buttonSpinnerTranslateX
    ]
})

export class RequestPasswordComponent {

    //#region Properties

    languageSelected: string;
    languages = LanguagesList;

    //#endregion

    //#region FormControls

    fullNameFormControl = new FormControl('', [Validators.required]);
    emailFormControl = new FormControl('',
    {
        validators: [
            Validators.required,
            Validators.pattern(/^[a-z0-9](\.?[a-z0-9_-]){0,}@[a-z0-9-]+\.([a-z]{1,6}\.)?[a-z]{2,6}$/)
        ],
        updateOn: 'blur'
    });

    request = false;
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

    onSubmit() {

        if (!this.emailFormControl.valid || !this.fullNameFormControl.valid) {
            return;
        }

        // Update current width and trigger animation
        const widths = computeButtonTranslateX(320, this.buttonLabel.nativeElement.clientWidth);
        this.labelTransform = widths[0];
        this.spinnerPadding = widths[1];

        // Trigger animation
        this.request = true;

        this.userAuth.requestResetPassword(this.fullNameFormControl.value, this.emailFormControl.value).subscribe(
            response => {
                this.request = false;

                this.dialog.open(AuthDialog, {
                    width: '500px',
                    data: {
                        mode: 0,
                        title: this.translate.instant('HOME.RequestPasswordReset.WarningDialog.Title'),
                        content: this.translate.instant('HOME.RequestPasswordReset.WarningDialog.Content')
                    }
                });
            },
            error => {
                this.request = false;

                switch (error.status) {
                    case 401:
                        this.emailFormControl.setErrors({notDataMatch: true});
                    break;
                    case 404:
                        this.emailFormControl.setErrors({notMatch: true});
                    break;
                    default:
                        this.snackBar.open(this.translate.instant('SERVER.Internal-error'), '', {duration: 5000});
                    break;
                }
            }
        );
    }

    onLanguageChange(lang: string) {
        localStorage.setItem('language', lang);
        this.translate.use(lang);
    }

    //#endregion

}
