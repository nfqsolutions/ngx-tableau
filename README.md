# ngx-tableau

ngx-tableau is an Angular module that allows to embed a [Tableau](https://www.tableau.com) report in an Angular webapp.
In this project there is the code of ngx-tableau library, located at `projects/tableau` and the code for a base Angular webapp which includes the library, to make development easier.

## Running development server

Run `npm start` to start a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Developing ngx-tableau library

Make changes in `projects/tableau/src/lib` and execute command `npm run build-tableau` to build tableau library module.

## Running unit tests for tableau library

Run `npm test` to execute ngx-tableau unit test

## Getting Tableau tickets

To be able to embed a private Tableau visualization without asking for credentials to the end user, you should get a Tableau ticket that will bypass the authentication for the report. There is a Postman collection called `ngx-tableau.postman_collection.json` that includes the two needed requests to obtain a Tableau ticket.
