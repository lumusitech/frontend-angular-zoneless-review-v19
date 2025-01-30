# Angular19

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Created with `ng new angular19`, with SCSS, Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering), Server Routing and App Engine APIs (Developer Preview)

## Initial changes

- **angular.json:** Add changeDetection on push into schematics file. With this, every time we create a component with cli (ng g c ...) angular adds changeDetectionStrategy onPush on component. Besides, we add skipTests because, in the end, we add custom tests with Jest and Testing Library.

  ```js
  "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "changeDetection": "OnPush",
          "skipTests": true
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

- **app.config.ts:** Add the withComponentInputBinding method to provideRouter to get route parameters using only traditional @Input or Input (signal).

  ```js
  providers: [
    ...
    provideRouter(routes, withComponentInputBinding()),
    ...
  ]
  ```

- **app.config.ts:** Add the httpClient method to do http requests and change the default rxjs for fetch

  ```js
  providers: [
    ...
    provideHttpClient(withFetch()),
    ...
  ]
  ```

  - **app.config.ts:** The withEventReplay method allows us to cache interactions when hydration is not yet finished, in other words, when JavaScript is not yet ready to use.

  ```js
  providers: [
    ...
    provideClientHydration(withEventReplay()),
    ...
  ]
  ```

- **app.config.ts:** Add the withIncrementalHydration method to do defer hydration, in other words, it allows us to load JavaScript when one or another condition that we have established is met.

  ```js
  providers: [
    ...
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    ...
  ]
  ```

- **app.config.ts:** Completed modification:

  ```js
  export const appConfig: ApplicationConfig = {
    providers: [provideExperimentalZonelessChangeDetection(), provideRouter(routes, withComponentInputBinding()), provideHttpClient(withFetch()), provideClientHydration(withEventReplay(), withIncrementalHydration())],
  };
  ```

  Then, In any html component, we can use:

  ```html
  <!-- For example -->
  @defer(hydration on viewport) {
  <app-any-component />
  }

  <!-- OR  -->
  @defer(hydration on hover) {
  <app-any-component />
  }

  <!-- OR -->
  @defer(on iddle; hydration on interaction) {
  <app-any-component />
  }
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

## Section about Single source of truth architecture

In this project, we centralize app data into state using signals. The character module integrates an example with this architecture.

## Section about nested custom reactive forms using signals

Adding an example of nested forms with signals into the form module. Be careful about the complexity. In my opnion, This mode of working with forms may not be the best option; it is just one more option.


## Section about interceptors

An interceptor in Angular is a service that intercepts HTTP requests or responses for processing. 
Interceptors in Angular are often used to manage tokens, particularly for handling authentication and authorization. They can attach tokens to outgoing HTTP requests, validate tokens, handle token expiration, and perform token refresh logic. This ensures that all necessary security measures are applied seamlessly to your HTTP requests. 
Generate an interceptor with cli. Example:

```sh
ng g interceptor interceptors/auth --skip-tests
```

In addition, we need add the created interceptor into app.config.ts, as we can see below:

```js
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    ...
  ],
};
```