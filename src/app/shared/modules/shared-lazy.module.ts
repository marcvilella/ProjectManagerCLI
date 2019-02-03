import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpLoaderFactory } from './shared.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    HttpModule,
    CommonModule,
    TranslateModule.forChild({loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient],
    }}),
  ],
  exports: [
    CommonModule,
    TranslateModule
  ]
})
export class SharedLazyModule {}
