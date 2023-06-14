/* eslint-disable no-undef */
import { FastifyReply, FastifyRequest } from 'fastify'
import { currencyControllers } from '../src/controllers/currencyStock'
import { currencyServices } from '../src/services/currencyStock'

// Mock FastifyRequest e FastifyReply para os testes
const mockRequest = {} as FastifyRequest
const mockReply = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
} as unknown as FastifyReply

// Mock das funções do currencyServices para os testes
jest.mock('../src/services/currencyStock', () => ({
  currencyServices: jest.fn().mockReturnValue({
    getAll: jest.fn().mockResolvedValue({
      statusCode: 200,
      data: [
        {
          id: 'e91fa5b3-8cf2-4f0e-a4a0-9c6301d81c18',
          value: '5',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: 'e225ee25-2a3b-4c46-8af8-9f21e86f9848',
          value: '0.50',
          type: 'coin',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: 'e0a0ba0d-d3bb-48d7-af24-858dd0b8ab32',
          value: '100',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: 'cf8fb51c-d766-40f4-a4f0-160a561a3ea7',
          value: '20',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: 'cf676400-3c1a-41cc-a61a-f318bfff9d7c',
          value: '50',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: 'b3424b97-73dc-4825-8812-c0e05e5c6921',
          value: '0.25',
          type: 'coin',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '965e5276-f54c-4a31-8579-d3ef4012b35c',
          value: '10',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '5abf106c-9efc-42fb-a652-d7014f6f8702',
          value: '2',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '1c069b09-bb7b-4c46-b8a6-906085a2470a',
          value: '200',
          type: 'bank-note',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '56ab4c7a-6a05-4d60-9a7a-22bfa6d170a1',
          value: '0.05',
          type: 'coin',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '16ffafe4-4eab-4198-991a-76d5170a59a6',
          value: '1',
          type: 'coin',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '14808f23-3bab-46ef-a09e-0950b95835f8',
          value: '0.10',
          type: 'coin',
          origin: 'BRL',
          quantity: 10,
        },
        {
          id: '0798b879-dea0-4f91-b81b-bd72c956f9c1',
          value: '0,01',
          type: 'coin',
          origin: 'BRL',
          quantity: 10,
        },
      ],
    }),
  }),
}))

describe('currencyControllers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll should return status 200 OK and currency data', async () => {
    // Chamar a função getAll do controller
    await currencyControllers().getAll(mockRequest, mockReply)

    // Verificar se a função do serviço foi chamada corretamente
    expect(currencyServices().getAll).toHaveBeenCalledTimes(1)

    // Verificar se a função de resposta foi chamada corretamente
    expect(mockReply.status).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith([
      {
        id: 'e91fa5b3-8cf2-4f0e-a4a0-9c6301d81c18',
        value: '5',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: 'e225ee25-2a3b-4c46-8af8-9f21e86f9848',
        value: '0.50',
        type: 'coin',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: 'e0a0ba0d-d3bb-48d7-af24-858dd0b8ab32',
        value: '100',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: 'cf8fb51c-d766-40f4-a4f0-160a561a3ea7',
        value: '20',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: 'cf676400-3c1a-41cc-a61a-f318bfff9d7c',
        value: '50',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: 'b3424b97-73dc-4825-8812-c0e05e5c6921',
        value: '0.25',
        type: 'coin',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '965e5276-f54c-4a31-8579-d3ef4012b35c',
        value: '10',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '5abf106c-9efc-42fb-a652-d7014f6f8702',
        value: '2',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '1c069b09-bb7b-4c46-b8a6-906085a2470a',
        value: '200',
        type: 'bank-note',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '56ab4c7a-6a05-4d60-9a7a-22bfa6d170a1',
        value: '0.05',
        type: 'coin',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '16ffafe4-4eab-4198-991a-76d5170a59a6',
        value: '1',
        type: 'coin',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '14808f23-3bab-46ef-a09e-0950b95835f8',
        value: '0.10',
        type: 'coin',
        origin: 'BRL',
        quantity: 10,
      },
      {
        id: '0798b879-dea0-4f91-b81b-bd72c956f9c1',
        value: '0,01',
        type: 'coin',
        origin: 'BRL',
        quantity: 10,
      },
    ])
  })
})
