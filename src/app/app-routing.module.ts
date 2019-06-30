import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './shared/services/auth.service';

const routes: Routes = [
    {path: 'auth',  loadChildren: './modules/home/home.module#HomeModule'},
    {path: 'app', loadChildren: './modules/application/application.module#ApplicationModule', canLoad: [AuthGuard]},
    {path: '', redirectTo: 'auth', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
