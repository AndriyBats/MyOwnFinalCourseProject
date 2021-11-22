// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  BACKEND_URL: 'http://localhost:3000',
  firebaseConfig : {
    apiKey: "AIzaSyBTtA9OSHIOc87AoAFvfFp0-UdzSgCD_x8",
    authDomain: "laboratory-f4f6f.firebaseapp.com",
    projectId: "laboratory-f4f6f",
    storageBucket: "laboratory-f4f6f.appspot.com",
    messagingSenderId: "170572689627",
    appId: "1:170572689627:web:3566d4a80464bd932cdcfe"
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
