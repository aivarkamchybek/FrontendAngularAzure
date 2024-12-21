// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "https://localhost:7046",
  scopeUri: ["api://da284c96-a647-49ff-9bb4-e5bd0b66663d/Forecast.Read"],
  tenantId: "7e3ec2a7-8569-4b4b-836c-36a34792d06e",
  uiClientId: "0a220d32-bde5-464a-a1f4-3945d8473ca4",
  redirectUrl: "http://localhost:4200",
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
