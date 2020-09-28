const getSubjects = require('./index')
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

describe('fetching subjects data', () => {
  let client

  beforeEach(() => client = new Client())

  afterEach(() => jest.clearAllMocks())

  it('should process a successful request', async () => {
    const request = {
      query: {
        maxLat: '52',
        minLat: '50',
        maxLon: '125',
        minLon: '120'
      }
    }
    await getSubjects(context, request)
    expect(client.connect).toHaveBeenCalled()
    expect(client.end).toHaveBeenCalled()
    expect(client.query).toHaveBeenCalledWith('SELECT * FROM subjects where latitude < $1 and latitude > $2 and longitude < $3 and longitude > $4', ['52', '50', '125', '120'])
    expect(context.res.status).toBe(200)
  })

  it('should fail without the correct params', async () => {
    const request = {
      query: {}
    }
    await getSubjects(context, request)
    expect(client.connect).not.toHaveBeenCalled()
    expect(client.query).not.toHaveBeenCalled()
    expect(client.end).not.toHaveBeenCalled()
    expect(context.res.status).toBe(422)
    expect(context.res.body).toBe('Query params must include maxLat, minLat, maxLon, and minLon')
  })
})