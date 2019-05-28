import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './components/dashboard.component';
import { CalendarComponent } from './components/calendar.component';
import { BoardHomeComponent } from './components/board-components/board-home/board.home.component';
import { BoardContainerComponent } from './components/board-components/board-container/board.container';


const applicationRoutes: Routes = [
    {path: '', component: ApplicationComponent, children: [
        {path: '', component: DashboardComponent},
        {path: 'dashboard', redirectTo: '',  pathMatch: 'full'},
        {path: 'calendar', component: CalendarComponent},
        {path: 'board', component: BoardHomeComponent},
        {path: 'board/:id/:card', component: BoardContainerComponent},
        {path: 'board/:id', component: BoardContainerComponent}
    ]},
    {path: '', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forChild(applicationRoutes)],
    exports: [RouterModule]
})

export class ApplicationRouting {}
