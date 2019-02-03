import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';


const applicationRoutes: Routes = [
    {path: '', component: ApplicationComponent},
    {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(applicationRoutes)],
    exports: [RouterModule]
})

export class ApplicationRouting {}