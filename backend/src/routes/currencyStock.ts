import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { currencyControllers } from '../controllers/currencyStock'

export async function currencyStockRoutes(
  app: FastifyInstance,
  _reply: FastifyReply,
) {
  app.addHook('preHandler', async (request: FastifyRequest) => {
    await request.jwtVerify()
  })
  app.get('/currency', currencyControllers().getAll)

  app.get('/currency/:id', currencyControllers().getOne)

  app.post('/currency', currencyControllers().create)

  app.put('/currency/:id', currencyControllers().update)

  app.delete('/currency/:id', currencyControllers().deleteOne)
}
