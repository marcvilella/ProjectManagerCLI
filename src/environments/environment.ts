// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'localhost:4200',
  // url: 'http://192.168.1.5:4200',
  server: {
    url: 'http://localhost:3000',
    // url: 'http://192.168.1.5:3000'
  },
  colors: {
    applicationColor: 'rgb(26, 35, 126)',
    toolbarColor: 'rgb(140, 140, 140)',
    itemBackground: 'rgb(235, 235, 235)',
    itemHoverBorder: 'rgb(210, 210, 210)',
    itemHoverBackground: 'rgb(224, 224, 224)',
    buttonBackground: 'rgb(210, 210, 210)',
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
