import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { usersControllers } from '../controllers/users'

export async function usersRoutes(app: FastifyInstance, _reply: FastifyReply) {
  app.get('/user', async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()
    return usersControllers().getAll(request, reply)
  })

  app.get('/user/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()
    return usersControllers().getOne(request, reply)
  })

  app.post('/user', async (request: FastifyRequest, reply: FastifyReply) => {
    return usersControllers().create(request, reply)
  })

  app.put('/user/:id', async (request: FastifyRequest, reply: FastifyReply) => {
    await request.jwtVerify()
    return usersControllers().update(request, reply)
  })

  app.delete(
    '/user/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      await request.jwtVerify()
      return usersControllers().deleteOne(request, reply)
    },
  )
}
