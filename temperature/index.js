const pg = require('pg');

function executeSQL(context, params) {
    const connectionString = 'postgres://postgres:postgres@localhost:5432/sample_db'
    const client = new pg.Client({ connectionString })

    client.connect();
    const { lat, lon } = params
    
    if (!lat || !lon) {
        context.res = {
            status: 422,
            body: 'Query params must include both lat and lon'
        }
        return context.done()
    }

    const query = `SELECT * FROM temperature where lat = ${lat} and lon = ${lon}`;

    client.query(query)
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