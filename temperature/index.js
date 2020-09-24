const pg = require('pg');

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

    client.query(query, values)
        .then(res => {
            context.res = {
                status: 200,
                body: res.rows
            }
            context.done()
        })
        .catch(err => {
            context.res = {
                status: 500,
                body: 'Error connecting to the mapping viz database'
            }
            context.done()
        })
}

module.exports = function (context, req) {
    executeSQL(context, req.query)
}