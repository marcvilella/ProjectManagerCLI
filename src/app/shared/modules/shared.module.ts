import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
   return new TranslateHttpLoader(http);
}

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


//TODO: Hacer que funciones el cambio de idioma default a otro
//No se carga, solo se carga el idioma seleccionado y el default

@NgModule({
    imports: [
      HttpModule,
      CommonModule,
      HttpClientModule,
      TranslateModule.forRoot({
         loader: {
           provide: TranslateLoader,
           useFactory: HttpLoaderFactory,
           deps: [HttpClient],
         },
         isolate: false
       }),
       JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          //whitelistedDomains: ['localhost:3000/api/login'],
          blacklistedRoutes: ['localhost:3000/api/auth/']
        }
      })
    ],
    exports: [
      CommonModule,
      TranslateModule
    ]
})
export class SharedModule {

  constructor(private translate: TranslateService) {
                  
    translate.addLangs(["en", "es"]);
    translate.setDefaultLang('en');

    let lang: string = localStorage.getItem('language');
    if(lang === null){
      let browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

      localStorage.setItem('language', translate.currentLang)
    }
    else
      translate.use(lang.match(/en|es/) ? lang : 'en');

  }
}
