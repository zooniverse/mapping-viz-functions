const pg = require('pg');

function executeSQL(context, params) {
    const connectionString = 'postgres://postgres:postgres@localhost:5432/sample_db'
    const client = new pg.Client({ connectionString })

    client.connect();
    const { maxLat, minLat, maxLon, minLon } = params

    if (!maxLat || !minLat || !maxLon || !minLon) {
        context.res = {
            status: 422,
            body: 'Query params must include maxLat, minLat, maxLon, and minLon'
        }
        return context.done()
    }

    const query = `SELECT * FROM subjects where lat < ${maxLat} and lat > ${minLat}
        and lon < ${maxLon} and lon > ${minLon}`;

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