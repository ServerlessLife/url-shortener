# Url Shortener

This sample serverless application is built with a CDK-based framework [SST](https://sst.dev/) and a UI written in React. Data is stored in DynamoDB.

**The goal was to build a fully functional application that is very simple with as little boilerplate code and as few libraries as possible.**

The application is deployed here:   
[https://d3543jtd1wd22c.cloudfront.net](https://d3543jtd1wd22c.cloudfront.net)  
(if not already removed)

# Code

The repository is structured as a monorepo with NPM workspaces.

Folders:  
 - `frontend` - The frontend written in React.  
 - `service\core` - Business logic.  
 - `service\functions` - Code for AWS Lambda.  
 - `service\test` - Unit, integration and end-to-end tests.

# How to run

### `npm run start`

Starts the Live Lambda Development environment.

### `npm run build`

Build your app and synthesize your stacks.

### `npm run deploy`

Deploy all your stacks to AWS.

### `npm run remove`

Remove all your stacks and all of their resources from AWS.

### `npm run test`

Runs tests using [Vitest](https://vitest.dev/). Vitest is a Jest compatible framework with some improvements.

### `REACT_APP_API_URL=xxx npm run start:fe`

Starts the Development environment for the frontend. `xxx` is output from the deploy returned by `npm run start` or `npm run deploy`.

# Room for improvements

 - There are only basic unit, integration, and end-to-end tests. None of the edge cases are covered.
 - A fully end-to-end test that includes UI with frameworks like Cypress, Selenium, Puppeteer, ... would be beneficial.
 - CI/CD is necessary for efficient development.
 - OpenApi/Swagger would help with documenting and communicating with the frontend team.