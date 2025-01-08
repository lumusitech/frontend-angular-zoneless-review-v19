# Angular19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Created with `ng new angular19`, SCSS and SSR

## Initial changes

- **angular.json:** Add changeDetection on push into schematics file. With this, every time we create a component with cli (ng g c ...) angular adds changeDetectionStrategy onPush on component.

  ```js
  "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "changeDetection": "OnPush"
        }
      },
  ```

- **app.config.ts:** Change Zonejs change detection by Zoneless (signals).

  ```js
  providers: [
    // provideZoneChangeDetection({ eventCoalescing: true }),
    provideExperimentalZonelessChangeDetection(),
    ...
  ]
  ```

- **app.config.ts:** Add the withComponentInputBinding method to provideRouter to get route parameters using only traditional @Input or Input (signal)."

  ```js
  providers: [
    ...
    provideRouter(routes, withComponentInputBinding()),
    ...
  ]
  ```

- **app.config.ts:** Add the httpClient method to do http requests and change the default rxjs for fetch"

  ```js
  providers: [
    ...
    provideHttpClient(withFetch()),
    ...
  ]
  ```

- **tsconfig.json:** Add an alias for the app path"
  ```js
  "compilerOptions": {
    ...
    "baseUrl": "./",
    "paths": {
      "@app/*": [
        "src/app/*"
      ]
    }
  },
  ```

## Container/presentational pattern

### separation of concerns - SoC

One way to enforce separation of concerns is by using the Container/Presentational pattern

- **Presentational Components**: Components that care about how data is shown to the user.

- **Container Components:** Components that care about what data is displayed to the user. In addition, it is responsible for communicating with external entities.
