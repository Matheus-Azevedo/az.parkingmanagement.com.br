import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { vehiclesRoutes } from './routes/vehicles'
import { currencyStockRoutes } from './routes/currencyStock'
import { authenticationRoutes } from './routes/authentication'
import { usersRoutes } from './routes/users'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'az.parkingmanagement.com.br',
})

app.register(authenticationRoutes)
app.register(usersRoutes)
app.register(vehiclesRoutes)
app.register(currencyStockRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running on http://localhost:3333')
  })

export default app
