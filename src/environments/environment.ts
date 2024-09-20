// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  msal: {
    clientId: '57ca81bc-7cac-4a46-931b-994a2afa05ac',
    authority: 'https://login.microsoftonline.com/b545925d-9548-4587-889b-a1b79b107804',
    redirectUri: 'msauth://io.ionic.starter/M61nf%2BaC69kCXmFY1ejcX83rDNc%3D'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
