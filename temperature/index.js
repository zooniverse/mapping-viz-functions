const pg = require('pg');

function executeSQL(context, params) {
    const connectionString = 'postgres://postgres:postgres@localhost:5432/sample_db'
    const client = new pg.Client({ connectionString })

    client.connect();
    const { lat, lon } = params

    const query = `SELECT * FROM temperature where lat = ${lat} and lon = ${lon}`;

    client.query(query).then(res => {
        context.res = {
            body: res.rows
        }
        context.done()
    })
}

module.exports = function (context, req) {
    executeSQL(context, req.query)
}