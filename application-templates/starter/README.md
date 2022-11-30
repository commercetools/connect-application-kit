<p align="center">
  <a href="https://commercetools.com/">
    <img alt="commercetools logo" src="https://unpkg.com/@commercetools-frontend/assets/logos/commercetools_primary-logo_horizontal_RGB.png">
  </a></br>
  <b>Integration Starter</b>
</p>

This is the `starter` template to develop [integrations](https://marketplace.commercetools.com/).

## Instructions

Create repository from this template repository to build the integration application , folder structure needs to be followed to ensure certification & deployment from commercetools connect team 

## Architecture principles for building an integration 

* Connector solution should be Multi tenant & lightweight in nature
* Connector solution should be cloud native in approach using serverless features from GCP/AWS
* Infrastructure as code using Terraform/ GCP Cloud build scripts
* Connector solutions should follow test driven development. Unit , Integration (& E2E) tests should be included and successfully passed to be used
* No hardcoding of customer related config. If needed, values in an environment file
* Connector solution should be supported with detailed documentation
* Connectors should be point to point in nature, no persistence capabilities should be added
* Connector solution should use open source technologies, although it can be private
* Webhooks/ endpoints exposed should only be utilized by either commercetools or 3rd party system, these should not be exposed publicly to avoid misuse
* Code should not contain console.log statements, use [the included logger](https://github.com/commercetools/merchant-center-application-kit/tree/main/packages-backend/loggers#readme) instead.

