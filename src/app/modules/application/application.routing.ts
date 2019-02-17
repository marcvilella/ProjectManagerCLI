import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './components/dashboard.component';
import { BoardComponent } from './components/board.component';


const applicationRoutes: Routes = [
    {path: '', component: ApplicationComponent, children: [
        {path: '', component: DashboardComponent},
        {path: 'dashboard', redirectTo: '',  pathMatch: 'full'},
        {path: 'board', component: BoardComponent}
    ]},
    {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(applicationRoutes)],
    exports: [RouterModule]
})

export class ApplicationRouting {}