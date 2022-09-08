<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a></br>
  <h2 align="center">commercetools Connect Application Kit </h2>
</p>
<p align="center">
  <i>✨ Monorepository with tools and components for developing connect applications 🛠</i>
</p>

## Getting started

If you are developing a connect application, you can start by installing one of our [templates](./application-templates) using the `create-connect-app` CLI.

```bash
$ npm install --global @commercetools-connect/create-connect-app
$ create-connect-app first-connect-application --template starter

# or

$ npx @commercetools-connect/create-connect-app@latest first-connect-application --template starter
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

Build the application bundles

```bash
$ yarn build

# or
$ yarn build:bundles:watch
```

# Certification

In order to deploy your connect application on commercetools provided infrastructure, it needs to reviewed by certification team. This can be requested by creating a listing using <a href="https://docs.commercetools.com">connect APIs </a> 

A default starter pack has a directory structure as shown below

```
├── <docs>
│   └── readme.md
├── <app1>
│   ├── src
│   ├── Dockerfile
│   └── package.json
├── <app2>
│   ├── src
│   ├── Dockerfile
│   └── package.json
└── connect.yaml

```

You can choose to remove/ add applications based on needs with similar repository structure.

Connect deployment details needs to be specified in `connect.yaml` which is required information needed for certificaiton of the application



# Deployment config

Connect supports 3 types of application which needs to set as `applicationType` in the config file
1. `service` - Standalone application which can do a specific task triggered by any HTTP method (can be used for <a href="https://docs.commercetools.com/api/projects/api-extensions">API extensions</a> ). HTTP url will be generated and exposed as result of the deployment.
2. `event` - Event topics & related consumer services to be able to receive events and perform any task asynchronously (can be used for <a href="https://docs.commercetools.com/api/projects/subscriptions">Subscriptions</a>). A topic will be generated and exposed as result of the deployment
3. `job` - Task which needs to be performed at regular basis with defined intervals, these tasks can be scheduled using <a href="https://en.wikipedia.org/wiki/Cron">cron</a> expression


A sample deployment config looks like this

```
deployAs:
  - applicationType: service
    dockerFilePath: app1/
    name: app1
  - applicationType: job
    dockerFilePath: app2/
    name: app2
    properties:
      schedule: */5 * * * *
  - applicationType: event
    subscriber: app1
    name: app1Event

```

- Dockerfile path is a mandatory information needed to be able to build & deploy images
- A schedule property is additional mandatory information needed to be able to schedule the job
- Event type of application needs to be defined together with a service type of application with mandatory subscriber information to process the received event
