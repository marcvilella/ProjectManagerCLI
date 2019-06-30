import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Home Components
import { HomeComponent } from './home.component';
import { SignUpComponent } from './components/sign-up.component';
import { LogInComponent } from './components/log-in.component';
import { PasswordResetComponent } from './components/password.reset.component';
import { RequestPasswordComponent } from './components/request.password.component';

const homeRoutes: Routes = [
    {path: 'log-in', component: LogInComponent},
    {path: 'log-in/forgot', component: RequestPasswordComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-up/trial', redirectTo: 'sign-up',  pathMatch: 'full'},
    {path: 'terms-and-conditions', component: HomeComponent},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: '', redirectTo: 'log-in', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRouting {}
