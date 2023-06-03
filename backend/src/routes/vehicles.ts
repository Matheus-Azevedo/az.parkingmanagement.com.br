import { FastifyInstance, FastifyRequest } from 'fastify'
import { vehiclesControllers } from '../controllers/vehicles'

export async function vehiclesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request: FastifyRequest) => {
    await request.jwtVerify()
  })

  app.get('/vehicles', vehiclesControllers().getAll)

  app.get('/vehicles/:id', vehiclesControllers().getOne)

  app.post('/vehicles', vehiclesControllers().create)

  app.put('/vehicles/:id', vehiclesControllers().update)

  app.delete('/vehicles/:id', vehiclesControllers().deleteOne)
}
