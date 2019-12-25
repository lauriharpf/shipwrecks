Shipwrecks
==========
[![Github Actions Status](https://github.com/lauriharpf/shipwrecks/workflows/Java%20CI/badge.svg)](https://github.com/lauriharpf/shipwrecks/actions?query=workflow%3A%22Java+CI%22)

## Development

### Setup

1. Install Java 11 JDK
1. Install IntelliJ IDEA
1. Install Docker
1. Run `docker pull mongo` from command line
1. Run `docker run -p 27017:27017 --name some-mongo -d mongo:latest`
1. In IntelliJ IDEA, open the project folder 
1. Click _Add Configuration..._ . Add a new Maven configuration with
    * Working directory: _(Project folder)_
    * Command line: `spring-boot:run -Dspring-boot.run.fork=false`
    * In the `Runner` tab of the configuration, change `Environment variables` to `DATABASE_URL=mongodb://localhost:27017/test;GOOGLE_ID="";GOOGLE_CALLBACK_URI="";GOOGLE_SECRET=""` 
1. Open _File -> Project structure_. Ensure _Project SDK_ and _Project language level_ are set to _11_.

### Running
1. Run `docker start some-mongo` from command line if MongoDB container isn't already started
1. Run project via IntelliJ with the created configuration
1. Open `http://localhost:8080/` in your browser

No hot reloading: Restart the app after **any** changes to frontend or backend.

### Deployment
Shipwrecks is hosted at Heroku ( https://shipwrecks.herokuapp.com/ ). Pushing to `master` triggers Heroku to deploy a new version.