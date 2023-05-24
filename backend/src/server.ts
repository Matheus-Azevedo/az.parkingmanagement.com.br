import 'dotenv/config'

import fastify from 'fastify'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
// import { memoriesRoutes } from './routes/memories'
// import { authRoutes } from './routes/auth'
// import { uploadRoutes } from './routes/upload'

const app = fastify()

app.register(cors, {
  origin: true,
})

app.register(jwt, {
  secret: 'az.parkingmanagement.com.br',
})

// app.register()
// app.register(uploadRoutes)
// app.register(memoriesRoutes)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('Server is running on http://localhost:3333')
  })

export default app
