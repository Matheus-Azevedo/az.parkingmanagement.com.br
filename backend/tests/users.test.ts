/* eslint-disable no-undef */
import { FastifyReply, FastifyRequest } from 'fastify'
import { usersControllers } from '../src/controllers/users'
import { usersServices } from '../src/services/users'

// Mock FastifyRequest e FastifyReply para os testes
const mockRequest = {} as FastifyRequest
const mockReply = {
  status: jest.fn().mockReturnThis(),
  send: jest.fn().mockReturnThis(),
} as unknown as FastifyReply

// Mock das funções do usersServices para os testes
jest.mock('../src/services/users', () => ({
  usersServices: jest.fn().mockReturnValue({
    getAll: jest.fn().mockResolvedValue({
      statusCode: 200,
      data: [
        {
          id: 'e5dfeb0d-e80b-4208-9e57-5115935ac982',
          name: 'Eduardo',
          email: 'eduardo.jp@gmail.com',
          password:
            '$2a$13$Psj7AadD/gE4Vo/ntou9u.vToUKJa7QoO2ZuawJdMnIz6bbF9Ld8m',
          role: 'user',
          credit: null,
          Vehicle: [],
        },
        {
          id: 'a6bf90fa-1757-4d62-bf05-18c90846674d',
          name: 'Matheus',
          email: 'matheuseduardo.jp@gmail.com',
          password:
            '$2a$13$/WLahUVwmGjAuLq8Brisp.jgjFvYT0WZsbqrZNnukqVe/uoECnHsG',
          role: 'admin',
          credit: null,
          Vehicle: [],
        },
      ],
    }),
  }),
}))

describe('usersControllers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('getAll should return status 200 OK and user data', async () => {
    // Chamar a função getAll do controller
    await usersControllers().getAll(mockRequest, mockReply)

    // Verificar se a função do serviço foi chamada corretamente
    expect(usersServices().getAll).toHaveBeenCalledTimes(1)

    // Verificar se a função de resposta foi chamada corretamente
    expect(mockReply.status).toHaveBeenCalledWith(200)
    expect(mockReply.send).toHaveBeenCalledWith([
      {
        id: 'e5dfeb0d-e80b-4208-9e57-5115935ac982',
        name: 'Eduardo',
        email: 'eduardo.jp@gmail.com',
        password:
          '$2a$13$Psj7AadD/gE4Vo/ntou9u.vToUKJa7QoO2ZuawJdMnIz6bbF9Ld8m',
        role: 'user',
        credit: null,
        Vehicle: [],
      },
      {
        id: 'a6bf90fa-1757-4d62-bf05-18c90846674d',
        name: 'Matheus',
        email: 'matheuseduardo.jp@gmail.com',
        password:
          '$2a$13$/WLahUVwmGjAuLq8Brisp.jgjFvYT0WZsbqrZNnukqVe/uoECnHsG',
        role: 'admin',
        credit: null,
        Vehicle: [],
      },
    ])
  })
})
