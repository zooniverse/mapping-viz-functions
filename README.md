# Mapping Viz Functions
Azure Functions prepared for the Mapping Viz Tools project. This repo contains [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/), found in the `index.js` files within each route, or folder (eg: subjects, temperature). The app is hosted at the following domains:  
* Production: https://mapping-viz-functions-prod.azurewebsites.net
* Staging: https://mapping-viz-functions-staging.azurewebsites.net

## Functionality
The app has two endpoints, one to retrieve subjects and one to retrieve temperature.  
### Subjects endpoint
Query params `minLat`, `maxLat`, `minLon`, and `maxLon` are required - update these values as needed.  
https://mapping-viz-functions-prod.azurewebsites.net/api/subjects?maxLat=70&minLat=-70&maxLon=70&minLon=-70  
### Temperature endpoint
The query param `grid_index` is required - update this value as needed.  
https://mapping-viz-functions-prod.azurewebsites.net/api/temperature?grid_index=1

More info can be found at the Mapping Viz Tools [wiki](https://github.com/zooniverse/mapping-viz-tools/wiki/What-are-Azure-Functions%3F).

## Getting started
### Dependencies
In order to run this code, you'll need to install the Azure Functions [core tools.](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2)

Although not required, you may also want to install the Azure VS Code [extension.](https://code.visualstudio.com/docs/azure/extensions)

### Run with Docker
1. To build the containers, run the following command:  
  `docker-compose build`  
  You will need to re-run this command on any changes to the Dockerfile.

2. Run `docker-compose up`

3. To initialize the database tables and test data, in a new terminal tab run:  
  `docker-compose run --rm app yarn init-db`  
  You'll only need to do this once.

4. Run `yarn install`

5. To start the server run:  
  `docker-compose run -p 7071:7071 --rm app yarn start`

6. To stop the Docker container
 `docker-compose down`

### Run without Docker
#### Local database setup
1. Install PostgreSQL 11 and run the PostgreSQL service locally
2. Create a database called `mapping_viz_local`. You can do so with the following command on the terminal:  
`createdb mapping_viz_local`
3. Once that database is created, execute the db/schema.sql file and db/test_data.sql files on the `mapping_viz_local` database. To do so, execute the following commands:
   ```
   psql -d mapping_viz_local < ./db/schema.sql
   psql -d mapping_viz_local < ./db/data/test_data.sql
   ```

#### `yarn install`
To install the necessary dependencies

#### `yarn test`
To test the app

#### `yarn start`
To start the server. You an then try hitting the available endpoints (see terminal).

#### Connection Strings
For security, connection strings are set on the Azure Portal. Check out the `PG_DB_CONNECTION_STRING` ENV variable for this function when logged into the portal. For local testing, this variable can be set in the `local.settings.json` file. Just be careful not to commit any sensitive information when testing.

## Deployment
Deploying an Azure Function is simple, using the Azure VS Code extension. You can follow steps [here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-javascript#publish-the-project-to-azure) on how to publish a function.

#### Staging or Production?
Although you could use [Azure Slots](https://docs.microsoft.com/en-us/azure/azure-functions/functions-deployment-slots) to handle different environments, you can also deploy the same function at a different location (eg. `mapping-viz-functions-staging` vs `mapping-viz-functions`) and set a different connection string at each endpoint to handle staging and production databases.

## Database Maintenance
We have currently decided to go with a bare-bones approach to database maintenance and schema migrations, due to the fact that 1) we do not foresee the schema changing much going forward, and 2) data within the DB tables can be regenerated easily from source CSV files.

The current schema is saved in db/schema.sql. This files are generated using [pg_dump](https://www.postgresql.org/docs/11/app-pgdump.html) (version 11) - to avoid version conflict with the remote postgres database, it's best to use pg_dump version 11.

In the event of a change in DB schema, please follow these steps:
1. Put up a PR to have the schema changes reviewed.
2. Once reviewed and merged, apply the changes to the staging and production databases. You can do so by connecting to the remote database using `psql` or any other database management tool.
3. Once the schema changes have been applied, perform a `pg_dump` of the schema using the `--no-owner` and `--no-acl` flags. To generate a file with just the schema, use the -s flag like so: `pg_dump -s --no-owner --no-acl mapping_viz_production > schema.sql`.
4. Replace db/schema.sql with the new dump file.
