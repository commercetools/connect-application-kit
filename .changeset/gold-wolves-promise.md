---
'@commercetools-connect/create-connect-app': minor
---

- Removed unused dependencies:

  - prettier
  - rcfile
  - ts-node
  - nodemon

- Upgraded dependencies:
  - jest -> @latest
  - ts-jest -> @latest

With this upgrade it's expected to solve the secured vulnerability on Prototype Pollution in JSON5 via Parse Method.
