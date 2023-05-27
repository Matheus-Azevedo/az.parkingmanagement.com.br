import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import prismaClient from '../database/prismaClient'
import bcrypt from 'bcryptjs'

export async function authenticationRoutes(app: FastifyInstance) {
  app.post('/login', async (request: FastifyRequest, reply: FastifyReply) => {
    const userSchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    })

    const userInfo = userSchema.parse(request.body)

    const user = await prismaClient.user.findUnique({
      where: {
        email: userInfo.email,
      },
    })

    if (!user) {
      reply.status(404).send({ message: 'Email or password incorrect' })
    } else {
      const token = app.jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          sub: user.id,
          expiresIn: '7 days',
        },
      )

      reply.status(200).send({ token })
    }
  })

  app.post(
    '/register',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const userSchema = z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['admin', 'user']),
      })

      const userInfo = userSchema.parse(request.body)

      let user = await prismaClient.user.findUnique({
        where: {
          email: userInfo.email,
        },
      })

      if (!user) {
        const saltRounds = 13
        const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds)

        user = await prismaClient.user.create({
          data: {
            name: userInfo.name,
            email: userInfo.email,
            password: hashedPassword,
            role: userInfo.role,
          },
        })
      }

      const token = app.jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        {
          sub: user.id,
          expiresIn: '7 days',
        },
      )

      reply.status(201).send({ token })
    },
  )
}
