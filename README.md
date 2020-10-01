# Mapping Viz Functions
Azure Functions prepared for the Mapping Viz Tools project. This repo contains [Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/), found in the `index.js` files within each route, or folder (eg: subjects, temperature).  

More info on the Mapping Viz Tools [wiki](https://github.com/zooniverse/mapping-viz-tools/wiki/What-are-Azure-Functions%3F)

### Dependencies
In order to run this code, you'll need to install the Azure Functions [core tools.](https://docs.microsoft.com/en-us/azure/azure-functions/functions-run-local?tabs=macos%2Ccsharp%2Cbash#v2)

Although not required, you may also want to install the Azure VS Code [extension.](https://code.visualstudio.com/docs/azure/extensions)

### yarn install
To install the necessary dependencies

### yarn test
To test the app

### yarn start
To start the server. You an then try hitting the available endpoints (see terminal).

### Connection Strings
For security, connection strings are set on the Azure Portal. Check out the `PG_DB_CONNECTION_STRING` ENV variable for this function when logged into the portal. For local testing, this variable can be set in the `local.settings.json` file. Just be careful not to commit any sensitive information when testing. 

### Deployment
Deploying an Azure Function is simple, using the Azure VS Code extension. You can follow steps [here](https://docs.microsoft.com/en-us/azure/azure-functions/functions-create-first-function-vs-code?pivots=programming-language-javascript#publish-the-project-to-azure) on how to publish a function. 

#### Staging or Production?
Although you could use Azure [Slots](https://docs.microsoft.com/en-us/azure/azure-functions/functions-deployment-slots) to handle different environments, you can also deploy the same function at a different location (eg. `mapping-viz-functions-staging` vs `mapping-viz-functions`) and set a different connection string at each endpoint to handle staging and production databases.