import { FastifyInstance } from 'fastify'
import { authenticationControllers } from '../controllers/authentication'

export async function authenticationRoutes(app: FastifyInstance) {
  app.post('/login', authenticationControllers().login)

  app.post('/register', authenticationControllers().register)
}
