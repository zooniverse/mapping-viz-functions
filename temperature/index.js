const pg = require('pg');
const performQuery = require('../performQuery').default

function executeSQL(context, params) {
    const connectionString = 'postgres://postgres:postgres@localhost:5432/sample_db'
    const client = new pg.Client({ connectionString })

    client.connect();
    const { grid_index } = params
    
    if (!grid_index) {
        context.res = {
            status: 422,
            body: 'Query param must include grid_index'
        }
        return context.done()
    }

    const query = `SELECT * FROM temperature where sst_grid_index = $1`;
    const values = [grid_index]
    performQuery(client, context, query, values)
}

module.exports = function (context, req) {
    executeSQL(context, req.query)
}