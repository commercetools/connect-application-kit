# @commercetools-connect/create-connect-app

## 0.4.0

### Minor Changes

- [#66](https://github.com/commercetools/connect-application-kit/pull/66) [`e79c8a8`](https://github.com/commercetools/connect-application-kit/commit/e79c8a8a470b5b9024d08e7cac059c2b0432583c) Thanks [@ruidias-commercetools](https://github.com/ruidias-commercetools)! - Changes made on tsconfig.json to comply with the recommended tsconfig rules.

## 0.3.0

### Minor Changes

- [#48](https://github.com/commercetools/connect-application-kit/pull/48) [`e81e9cf`](https://github.com/commercetools/connect-application-kit/commit/e81e9cfa243aaee59a8bf7b4ff600678e557cc9f) Thanks [@ruidias-commercetools](https://github.com/ruidias-commercetools)! - - Removed unused dependencies:

  - prettier
  - rcfile
  - ts-node
  - nodemon

  - Upgraded dependencies:
    - jest -> @latest
    - ts-jest -> @latest

  With this upgrade it's expected to solve the secured vulnerability on Prototype Pollution in JSON5 via Parse Method.

## 0.2.0

### Minor Changes

- [#47](https://github.com/commercetools/connect-application-kit/pull/47) [`e2f52a9`](https://github.com/commercetools/connect-application-kit/commit/e2f52a905b1f163fca0596d018820f2ca5cb554c) Thanks [@ruidias-commercetools](https://github.com/ruidias-commercetools)! - Added support for Node 18 in create-connect-app

## 0.1.0

### Minor Changes

- [#34](https://github.com/commercetools/connect-application-kit/pull/34) [`3ea6cf3`](https://github.com/commercetools/connect-application-kit/commit/3ea6cf39c01dc64b137c0071ffd566005a41000c) Thanks [@ruidias-commercetools](https://github.com/ruidias-commercetools)! - First Release

  This release introduces beta version of starter kit as part of Connect initiative in commercetools focussed on providing an execution environment for certified connectors built by the community, partners and customer to reduce operational overhead.

  Connect Starter Pack provides guidelines and templates (Service, Event, Job) in Typescript and Javascript. These templates aim to help the developer build, test and deploy the connector, helping our partners to build the connectors up to commercetools standards.

  This release includes:

  1. create-connect-app cli which enables you to quickly start building a new Connect Application with a normal setup configured for you
  2. Typescript and Javascript version of the starter template to develop connect application

  Refer [Readme](https://github.com/commercetools/connect-application-kit#readme) to understand usage of connect starter kit.

  > Note: There isn't an official changelog prior to this version.
