const getTemperature = require('./index')
const { Client } = require('pg')
const context = require('../testing/defaultContext')

jest.mock('pg', () => {
  const client = {
    connect: jest.fn(),
    query: jest.fn().mockResolvedValue(true),
    end: jest.fn()
  }
  return { Client: jest.fn(() => client) }
})

describe('fetching temperature data', () => {
  let client

  beforeEach(() => client = new Client())

  afterEach(() => jest.clearAllMocks())

  it('should process a successful request', async () => {
    const request = {
      query: {
        grid_index: '130'
      }
    }
    await getTemperature(context, request)
    expect(client.connect).toHaveBeenCalled()
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM temperatures where temperature_grid_index = $1', ['130'])
    expect(client.end).toHaveBeenCalled()
    expect(context.res.status).toBe(200)
  })
  
  it('should fail without the correct params', async () => {
    const request = {
      query: {}
    }
    await getTemperature(context, request)
    expect(client.connect).not.toHaveBeenCalled()
    expect(client.query).not.toHaveBeenCalled()
    expect(client.end).not.toHaveBeenCalled()
    expect(context.res.status).toBe(422)
    expect(context.res.body).toBe('Query param must include grid_index')
  })
})