const pg = require('pg');
const performQuery = require('../performQuery').default

async function executeSQL(context, params) {
    const connectionString = 'postgres://postgres:postgres@localhost:5432/sample_db'
    const client = new pg.Client({ connectionString })

    const { grid_index } = params
    
    if (!grid_index) {
        context.res = {
            status: 422,
            body: 'Query param must include grid_index'
        }
        return context.done()
    }
    
    client.connect();
    const query = `SELECT * FROM temperature where sst_grid_index = $1`;
    const values = [grid_index]
    await performQuery(client, context, query, values)
}

module.exports = async function (context, req) {
    await executeSQL(context, req.query)
}