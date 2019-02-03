import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component'
import { AuthGuard } from './shared/services/auth.service';

const routes: Routes = [
    {path: '', component: AppComponent},
    {path: 'auth',  loadChildren: './modules/home/home.module#HomeModule'},
    {path: 'app', loadChildren: './modules/application/application.module#ApplicationModule', canLoad: [AuthGuard]},
    {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
