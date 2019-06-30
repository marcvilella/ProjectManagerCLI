import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Modules
import { MaterialDesignModule } from '../../shared/modules/material-design.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedLazyModule } from '../../shared/modules/shared-lazy.module';
// Services
// Routing
import { HomeRouting } from './home.routing';

// Components
import { HomeComponent } from './home.component';
import { SignUpComponent } from './components/sign-up.component';
import { LogInComponent } from './components/log-in.component';
import { PasswordResetComponent } from './components/password.reset.component';
import { RequestPasswordComponent } from './components/request.password.component';
import { AuthDialog } from './components/auth.dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    SignUpComponent,
    LogInComponent,
    PasswordResetComponent,
    RequestPasswordComponent,
    AuthDialog
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HomeRouting,
    SharedLazyModule,
    MaterialDesignModule,
    TranslateModule.forChild()
  ],
  entryComponents: [
    AuthDialog
  ],
  providers: []
})
export class HomeModule { }
