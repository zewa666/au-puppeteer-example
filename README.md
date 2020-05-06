# Aurelia with Puppeteer

This is a sample repository showing the basic navigation example skeleton scaffolded with the Aurelia CLI and using Typescript, Puppeteer and Jest for E2E testing.
During scaffold, no E2E option was selected and Jest for unit testing.

## Setting up your project for Puppeteer

In order to get started follow these steps:

1. install these dependencies: `npm install --save-dev cross-env puppeteer @types/puppeteer`
2. In the folder `test` create a file `jest-puppeteer.config.json` with this content
```javascript
{
  "modulePaths": [
    "<rootDir>/src",
    "<rootDir>/node_modules"
  ],
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  "testMatch": [
    "<rootDir>/e2e/**/*.spec.ts"
  ],
  "testEnvironment": "node",
  "collectCoverage": false
}
```
3. create a folder `test/e2e`
4. create your test files ending with `YOURTESTNAME.spec.ts`
> see `test/e2e/demo.spec.ts` for a sample with additional comments
5. create the following npm scripts in your `package.json`
```json
{
  ...
  "scripts": {
    ...
    "puppeteer": "jest --config=test/jest-puppeteer.config.json",
    "puppeteer-headless": "cross-env HEADLESS=true jest --config=test/jest-puppeteer.config.json"
  }
  ...
}
```
6. start the app in a terminal `npm start`
7. in another terminal run
  * tests with browser visible via `npm run puppeteer`
  * run tests with a headless browser window via `npm run puppeteer-headless`
