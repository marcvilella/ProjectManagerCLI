import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ChartModule } from 'primeng/chart';


@NgModule({
      imports: [
      ],
      exports: [
            TableModule,
            BreadcrumbModule,
            ContextMenuModule,
            ChartModule
      ]
})
export class PrimeNgModule { }
