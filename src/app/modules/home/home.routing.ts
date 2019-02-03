import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Home Components
import { HomeComponent } from './home.component';
import { SignUpComponent } from './components/sign-up.component';
import { LogInComponent } from './components/log-in.component';
import { PasswordResetComponent } from './components/password.reset.component';
import { RequestPasswordResetComponent } from './components/request.password.reset.component';

const homeRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'log-in', component: LogInComponent},
    {path: 'log-in/forgot', component: RequestPasswordResetComponent},
    {path: 'sign-up', component: SignUpComponent},
    {path: 'sign-up/trial', redirectTo: 'sign-up',  pathMatch: 'full'},
    {path: 'terms-and-conditions', component: HomeComponent},
    {path: 'password-reset', component: PasswordResetComponent},
    {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(homeRoutes)],
    exports: [RouterModule]
})

export class HomeRouting {}