# NgEngine

[![Build status][ci-image]][ci-url]

NgEngine is an environment/plugin configuration module that supports NGRX. Checkout the boilerplate [here](https://github.com/calistyle/NgEngine-bolierplate).

## NgEngine and NgPacks
From our time spent working on Trails, we've really enjoyed some of the design patters, specifically Trailpacks. We're bringing that to Angular. With NgPacks you can register all of your modular components and more, even if they are lazy loaded without loosing performance. The other thing that we love about Trails is it's configuration concept.  With NgEngine, you now have environment driven configuration for all your NgPacks.

## Configuration
NgEngine exposes an injection token that can be used to provide configuration.

```ts
//app.module.ts

providers: [
  {
    provide: ENGINE_CONFIG,
    useValue: {
      environment: environment,
      appConfig: appConfig
    }
  }
],

```

## Anatomy of an NgPack
- index.ts
- package.json
- *.router.ts
- *.module.ts
- *.module.spec.ts
- containers
  - <container>
    - *.component.ts
    - *.component.spec.ts
    - *.component.scss
  - components
    - <component>
      - *.component.ts
      - *.component.spec.ts
      - *.component.scss
- services
  - <service>
    - *.service.ts
    - *.service.spec.ts
- guards
  - <guard>
    - *.guard.ts
    - *.guard.spec.ts
- config
  - index.ts
  - *.ts
- store
  - index.ts
  - actions
    - <action>
  - effects
    - <effect>
  - reducers
    - <reducer>

## appConfig
Angular configuration can be very strange at times and this leads to many developers just hard coding variables when they should be configurable. NgEngine solves this by providing an environment driven approach to configuration and uses the Map functionality of ES6.

### index.ts
The index barrel exports the configuration

### main.ts
Main exports the packs.

### env
Exports the environment specific configuration.
  
# Example
Let's say you have an app component, and you want to set some environment specific values, and that you also want to be able to share those values between different components, even if they are lazy loaded. Normally you would need to create some sort of service, do a bunch of injection and pray that you did it right.

With NgPacks, you set up your configuration for your component and then you can access it any other component through NgEngineService.

```ts
ngService.config.get('app.title')
```

Through NgService you have access to the config method.  Using dot syntax, you can ask the service for a value that may or may not exists with ease and confidence. So instead of something like:
```ts
// NOT SO GOOD
if (app && app.metadata && app.metadata.page1 && app.metadata.page1.title)
```

You can just query the config map:
```ts
// GOOD
if (ngSerice.config.get('app.metadata.page1.title'))
``` 

In addition, you can set default configs in your Packs and then override them through `appConfig/<pack-name>.ts` and additionally set overrides those based on your environment through `appConifg/env/<environment>/<pack-name>.ts`.

# Configuring your Application

## Boilerplate
Sometimes it's easier to see how it's done. Checkout [NgEngine-boilerplate](https://github.com/CaliStyle/NgEngine-boilerplate).

## Trails
For Trails documentation see the [Trails Website](https://trailsjs.io).  The only difference is that we are extending trails with Typescript and bundling it with webpack. You can configure Trails through `src/apiConfig`.

## Angular
For Angular documentation see the [Angular Website](https://angular.io).  You can configure your NgEngine Angular app through `src/appConfig`.

# Development

## Trails server
run `npm run build && node dist/server.js` for the trails server to start. Navigate to `http://localhost:3000/`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm start` for a dev server that expects the API server at `http://localhost:3000`.  

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Quick Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Alternatively run `npm run build`. The build artifacts will be stored in the `dist/` directory.

## Production Build
Run `npm run serve:prod:ngsw` for a production build with Service Workers and PWA. To just build the service worker build, run `npm run build:prod:ngsw` and then start it with `node dist/server`

Run `npm run build:prod` for a production build. The build artifacts will be stored in the `dist/` directory. To start the server run `node dist/server`.

## Running CI tests
Run `npm test` to execute the unit test, end to end tests, and mocha spec test for node.js.

## Running unit tests

Run `ng test` or `npm run test:ng` to execute the unit tests via [Karma](https://karma-runner.github.io). To continuously run unit tests, run `npm run test:ng:watch`

## Running end-to-end tests

Run `ng e2e` or `npm run test:e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Deploying to Heroku
First you will need to create a Heroku app. The package.json includes a "heroku-postbuild" script that will build the app. The Procfile includes the location to start the node server which will serve the app on Heroku.

## Known Issues
The Trails REPL (trailpack-repl) includes some characters that production webpack builds (`webpack -p`) can not parse and fails during the uglify process.  Currently, we use the normal webpack build which is faster but has a larger slug. If you can fix this, we would love a PR!

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

[ci-image]: https://img.shields.io/circleci/project/github/CaliStyle/NgEngine/master.svg
[ci-url]: https://circleci.com/gh/CaliStyle/NgEngine/tree/master
