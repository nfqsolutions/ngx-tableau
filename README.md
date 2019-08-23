# ngx-tableau

ngx-tableau is an Angular module that allows to embed a [Tableau](https://www.tableau.com) report in an Angular webapp.
In this project there is the code of ngx-tableau library, located at `projects/tableau` and the code for a base Angular webapp which includes the library, to make development easier.

## Running development server

Run `npm start` to start a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Developing ngx-tableau library

Make changes in `projects/tableau/src/lib` and execute command `npm run build-tableau` to build tableau library module.

## Getting Tableau tickets

To be able to embed a private Tableau visualization without asking for credentials to the end user, you should get a Tableau ticket that will bypass the authentication for the report. There is a Postman collection called `ngx-tableau.postman_collection.json` that includes the two needed requests to obtain a Tableau ticket.

## Running tests for tableau library

Run `npm test` to execute ngx-tableau unit tests

Run `npm run ci` to execute ngx-tableau continous integration tests

## Deploying module on npm registry

First you should login with an existing user on npm registry. You can create a new account [here](https://docs.npmjs.com/creating-a-new-npm-user-account). Then execute `npm login` to sign in.

Update `package.json` with the latest version following semver syntax x.y.z

Run `npm run deploy` to upload a new version of ngx-tableau to public npm registry
