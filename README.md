# Mapping Viz Functions
Azure Functions prepared for the Mapping Viz Tools project. This repo contains [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/), found in the `index.js` files within each route, or folder (eg: subjects, temperature).  

More info on the Mapping Viz Tools [wiki](https://github.com/zooniverse/mapping-viz-tools/wiki/What-are-Azure-Functions%3F)

## Getting started
### Dependencies
In order to run this code, you'll need to install the Azure Functions [core tools.](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2)

Although not required, you may also want to install the Azure VS Code [extension.](https://code.visualstudio.com/docs/azure/extensions)

### Run with Docker
1. To build the containers, run the following command:  
  `docker-compose build`  
  You will need to re-run this command on any changes to the Dockerfile.
  
2. To initialize the database tables and test data, run:  
  `docker-compose run --rm app yarn init-db`  
  You'll only need to do this once.
  
3. To start the server run:  
  `docker-compose run --rm app yarn start`
  
### Run without Docker
#### Local database setup
1. Install PostgreSQL 9.5 and run the PostgreSQL service locally 
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
The current schema is saved in db/schema.sql. This files are generated using [pg_dump](https://www.postgresql.org/docs/9.5/app-pgdump.html) (version 9.5.23) - to avoid version conflict with the remote postgres database, it's best to use pg_dump version 9.5. There are also files containing test data for local development, and the full dataset for back-up purposes - those live in db/data. The full_data.sql file is compressed using the `pg_dump` command's built in compression (using the flag `--compress=9`).

We have currently decided to go with a bare-bones approach to database maintenance and schema migrations, due to the fact that we do not foresee the schema changing much going forward. If the trajectory of the project changes, it may be helpful to make use of a package or library to manage the database.

### Schema Migrations
The current process for updating the schema is as follows:
1. Add a .sql file named 'migration10-13-20.sql' (replace with current date) to the db/schema_migrations folder. This file should contain the SQL commands that need to be executed in order to make the schema change, e.g. `ALTER TABLE`, etc.
2. Put up a PR to have the schema changes reviewed. Once reviewed and merged, apply the changes to the staging and production databases. You can do so by connecting to the remote database using `psql`, then in the `psql` prompt, enter the command `\include \path\to\file\migration10-13-20.sql` (see more on how to use the `\include` command in the [psql documentation](https://www.postgresql.org/docs/9.5/app-psql.html)).
3. Once the schema changes have been applied, perform a `pg_dump` of the schema for both environments, using the `--no-owner` and `--no-acl` flags. To generate a file with just the schema, use the -s flag like so: `pg_dump -s --no-owner --no-acl mapping_viz_production > schema.sql`. 
4. Replace db/schema.sql with the dump file in the repo. Also perform a dump of the data if necessary (using the data-only flag `-a`) and replace the test_data.sql and full_data.sql files in db/data. Note that the test_data.sql file only contains 100 records for each table and is not compressed, while the full_data.sql file contains all of the data and is compressed. To avoid version conflict with the remote postgres database, it's best to use pg_dump version 9.5. 
