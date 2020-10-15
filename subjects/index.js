const pg = require('pg');
const performQuery = require('../helpers/performQuery').default

async function executeSQL(context, params) {
  const connectionString = process.env['PG_DB_CONNECTION_STRING'] || 'postgres://postgres:postgres@localhost:5432/mapping_viz_local'
    const client = new pg.Client({ connectionString })

    const { maxLat, minLat, maxLon, minLon } = params

    if (!maxLat || !minLat || !maxLon || !minLon) {
        context.res = {
            status: 422,
            body: 'Query params must include maxLat, minLat, maxLon, and minLon'
        }
        return context.done()
    }

    client.connect();
    const query = `SELECT * FROM subjects where latitude < $1 and latitude > $2 and longitude < $3 and longitude > $4`;
    const values = [maxLat, minLat, maxLon, minLon]
    await performQuery(client, context, query, values)
}

module.exports = async function (context, req) {
    await executeSQL(context, req.query)
}