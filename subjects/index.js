const pg = require('pg');
const performQuery = require('../performQuery').default

async function executeSQL(context, params) {
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

    const query = `SELECT * FROM subjects where lat < $1 and lat > $2 and lon < $3 and lon > $4`;
    const values = [maxLat, minLat, maxLon, minLon]
    await performQuery(client, context, query, values)
}

module.exports = async function (context, req) {
    await executeSQL(context, req.query)
}