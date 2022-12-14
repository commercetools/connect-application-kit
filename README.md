<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a></br>
  <h2 align="center">commercetools Connect Application Kit </h2>
</p>
<p align="center">
  <i>✨ Monorepository with tools and components for developing connect applications 🛠</i>
</p>

## Template Features
- **Typescript & Javascript**: languages supported
- **Express**: Web server framework
- **commercetools sdk**: Embedded sdk library for commercetools specific implementation
- **Buildpack support**: Tooling to build production-ready container images from source code without a Dockerfile
- **Local development utilities**: Basic yarn tools to build, start , test, lint & prettify code
- **Structured logging library**: JSON formatted logger with log levels 
- **Tests**: Basic tests setup for application

## Getting started

If you are developing a connect application, you can start by installing one of our [templates](./application-templates) using the `create-connect-app` CLI.

```bash
$ npm install --global @commercetools-connect/create-connect-app
$ create-connect-app first-connect-application --template [typescript | javascript]

# or

$ npx @commercetools-connect/create-connect-app@latest first-connect-application --template [typescript | javascript]
```

# Developing connect applications
Install the dependencies (uses yarn workspaces):

```bash
$ yarn
```

To run the tests:

```bash
$ yarn test

# or
$ yarn test:watch
```

Build the application

```bash
$ yarn build

# or
$ yarn build:watch
```

Run the application locally

```bash
$ yarn start

# or
$ yarn start:dev
```

# Connect Certification

In order to deploy your connect application on commercetools provided infrastructure, it needs to reviewed by certification team. This can be requested by creating a listing using <a href="https://docs.commercetools.com">connect APIs </a> <em>(not yet released)</em>

A default starter pack has a directory structure as shown below, repository should be a mono repo setup where you can choose to have more than one application in a single connector if needed

```
├── <docs>
│   └── readme.md
├── <app1>
│   ├── src
│   ├── tests
│   ├── postDeploy.js
│   └── package.json
├── <app2>
│   ├── src
│   ├── tests
│   └── package.json
└── connect.yaml

```

You can choose to remove/add applications based on needs with similar repository structure.

Connect deployment details needs to be specified in `connect.yaml` which is required information needed for certificaiton of the application

Buildpack is used to build artifacts to deploy , use `npm start` or `Procfile` to define the <a href="https://github.com/GoogleCloudPlatform/buildpacks#default-entrypoint-behavior">default entry point</a>

# Deployment config

Connect supports 3 types of application which needs to set as `applicationType` in the config file
1. `service` - Standalone application which can do a specific task triggered by any HTTP method (can be used for <a href="https://docs.commercetools.com/api/projects/api-extensions">API extensions</a> or as a webhook to other systems). HTTP url will be generated and exposed as result of the deployment.
2. `event` - Event topics & related consumer services to be able to receive events and perform any task asynchronously (can be used for <a href="https://docs.commercetools.com/api/projects/subscriptions">Subscriptions</a>). A topic will be generated and exposed as result of the deployment
3. `job` - Task which needs to be performed at regular basis with defined intervals, these tasks can be scheduled using <a href="https://en.wikipedia.org/wiki/Cron">cron</a> expression


A sample deployment config looks like this, refer below for more detailed information on each property

```yaml
deployAs:
  - name: app1
    applicationType: service
    appPath: /app1
    configurationType:
      ENVIRONMENT_VARIABLE_1: standard
      ENVIRONMENT_VARIABLE_2: secret
      ENVIRONMENT_VARIABLE_3: secret
  - name: app2
    applicationType: job
    appPath: /app2
    properties:
      schedule: */5 * * * *
    configurationType:
      ENVIRONMENT_VARIABLE_1: standard
      ENVIRONMENT_VARIABLE_2: standard
  - name: app3
    applicationType: event
    appPath: /app3
    configurationType:
      ENVIRONMENT_VARIABLE_1: standard
      ENVIRONMENT_VARIABLE_2: secret
      ENVIRONMENT_VARIABLE_3: standard
```

- Multiple applications of same type can be setup
- A schedule property is additional mandatory information needed to be able to schedule the job
- Event type of application needs to be defined together with a service type of application with mandatory subscriber information to process the received event

## Property definition
- `name` - Identifier of the application deployment. Deployment output url, topic & schedule can be fetched based on this reference
- `applicationType` - Type of deployment . Can be one of `service`, `event` or `job`
- `appPath` - Folder for the application in the monorepo
- `configurationType` - Definiton of all environment variables needed by the application, customer will be responsible to provide value for these variables when choosen to deploy. Definition includes defining the type of variable if it needs to be secured or not . `standard` for customer provided values to be saved as plain text , `secret` for customer provided values to be secured and stored in encrypted format
- `schedule` - Schedule expression for job applications, it need to be input of type <a href="https://en.wikipedia.org/wiki/Cron">cron</a> expression