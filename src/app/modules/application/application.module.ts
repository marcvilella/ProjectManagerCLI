import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Modules
import { RouterModule } from '@angular/router'
import { SharedLazyModule } from '../../shared/modules/shared-lazy.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialDesignModule } from '../../shared/modules/material-design.module';

//Routing
import { ApplicationRouting } from './application.routing';

//Components
import { ApplicationComponent } from './application.component';


@NgModule({
  declarations: [
    ApplicationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationRouting,
    RouterModule,
    SharedLazyModule,
    MaterialDesignModule,
    TranslateModule.forChild()
  ],
  providers: []
})
export class ApplicationModule { }
