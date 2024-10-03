// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  msal: {
    clientId: 'b21a4f9d-a21c-4951-8c5e-0deede6d5cfb',
    authority: 'https://login.microsoftonline.com/b545925d-9548-4587-889b-a1b79b107804',
    redirectUri: 'http://localhost:8100'
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
