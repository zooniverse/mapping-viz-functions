async function performQuery(client, context, query, values) {
  await client.query(query, values)
    .then(res => {
        context.res = {
            status: 200,
            body: res.rows
        } 
        context.done()
        client.end()
    })
    .catch(err => {
        context.res = {
            status: 500,
            body: 'Error connecting to the mapping viz database'
        }
        context.done()
        client.end()
    })
}

exports.default = performQuery