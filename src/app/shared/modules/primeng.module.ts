import { NgModule } from '@angular/core';

import { TableModule } from 'primeng/table';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
      imports: [
      ],
      exports: [
            TableModule,
            BreadcrumbModule,
            ContextMenuModule
      ]
})
export class PrimeNgModule { }
