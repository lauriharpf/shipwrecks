# Shipwrecks.cc

[![Github Actions Status](https://github.com/lauriharpf/shipwrecks/workflows/Java%20CI/badge.svg)](https://github.com/lauriharpf/shipwrecks/actions?query=workflow%3A%22Java+CI%22)

## Development

### Setup

1. Install Java 11 JDK
1. Install IntelliJ IDEA
1. In IntelliJ IDEA, open the project folder
1. Click _Add Configuration..._ . Add a new Maven configuration with
   - Working directory: _(Project folder)_
   - Command line: `spring-boot:run -Dspring-boot.run.fork=false`
1. Open _File -> Project structure_. Ensure _Project SDK_ and _Project language level_ are set to _11_.

### Running the project

1. Run project via IntelliJ with the created configuration
1. Optional: Run `npm run-script watch` in project directory to immediately update UI when JS files are changed
1. Open `http://localhost:8080/` in your browser

To run a production build locally (minifies JavaScript), add `PRODUCTION_BUILD=true` to Maven configuration's environment variables.

### Running tests

- `mvn test` runs tests for the Java backend
- `npm test` runs tests for the frontend

### Deployment

Shipwrecks is hosted at Heroku ( https://shipwrecks.cc/ ). Pushing to `master` triggers Heroku to deploy a new version after CI has passed.
