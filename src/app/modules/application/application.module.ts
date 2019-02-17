import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

//Modules
import { RouterModule } from '@angular/router'
import { SharedLazyModule } from '../../shared/modules/shared-lazy.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialDesignModule } from '../../shared/modules/material-design.module';
import { AvatarModule } from 'ngx-avatar';

//Routing
import { ApplicationRouting } from './application.routing';

//Components
import { ApplicationComponent } from './application.component';
import { DashboardComponent } from './components/dashboard.component';
import { BoardComponent } from './components/board.component';


@NgModule({
  declarations: [
    ApplicationComponent,
    DashboardComponent,
    BoardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    ApplicationRouting,
    RouterModule,
    SharedLazyModule,
    MaterialDesignModule,
    AvatarModule,
    TranslateModule.forChild()
  ],
  providers: []
})
export class ApplicationModule { }
