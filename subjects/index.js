const pg = require('pg');

function executeSQL(context, params) {
    const connectionString = 'postgres://postgres:postgres@localhost:5432/sample_db'
    const client = new pg.Client({ connectionString })

    client.connect();
    const { maxLat, minLat, maxLon, minLon } = params

    const query = `SELECT * FROM subjects where lat < ${maxLat} and lat > ${minLat}
        and lon < ${maxLon} and lon > ${minLon}`;

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