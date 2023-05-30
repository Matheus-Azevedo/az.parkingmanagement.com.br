import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { statusCode } from '../utils/statusCode'
import prismaClient from '../database/prismaClient'
import { z } from 'zod'

export async function currencyStockRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request: FastifyRequest) => {
    await request.jwtVerify()
  })

  app.get('/currency', async (request: FastifyRequest, reply: FastifyReply) => {
    const currencyStock = await prismaClient.currencyStock.findMany()
    if (!currencyStock) {
      reply.status(statusCode.NOT_FOUND).send()
    }
    reply.status(statusCode.OK).send(currencyStock)
  })

  app.get(
    '/currency/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const idSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = idSchema.parse(request.params)
      const currencyStock = await prismaClient.currencyStock.findUnique({
        where: { id },
      })
      if (!currencyStock) {
        reply.status(statusCode.NOT_FOUND).send()
      }
      reply.status(statusCode.OK).send(currencyStock)
    },
  )
  app.post(
    '/currency',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bodySchema = z.object({
        name: z.string(),
        value: z.number(),
        type: z.string(),
        quantity: z.number(),
      })

      const { value, type, quantity, name } = bodySchema.parse(request.body)

      const currencyStockExists = await prismaClient.currencyStock.findFirst({
        where: { name },
      })

      if (currencyStockExists) {
        reply.status(statusCode.CONFLICT).send()
      }

      const newCurrencyStock = await prismaClient.currencyStock.create({
        data: {
          value,
          type,
          quantity,
          name,
        },
      })

      reply.status(statusCode.CREATED).send(newCurrencyStock)
    },
  )

  app.put(
    '/currency/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const idSchema = z.object({
        id: z.string().uuid(),
      })

      const bodySchema = z.object({
        quantity: z.number(),
      })

      const { id } = idSchema.parse(request.params)
      const { quantity } = bodySchema.parse(request.body)

      const currencyStockExists = await prismaClient.currencyStock.findFirst({
        where: { id },
      })

      if (!currencyStockExists) {
        reply.status(statusCode.NOT_FOUND).send()
      } else {
        const updatedCurrencyStock = await prismaClient.currencyStock.update({
          where: { id },
          data: {
            quantity: quantity + currencyStockExists.quantity,
          },
        })
        reply.status(statusCode.OK).send(updatedCurrencyStock)
      }
    },
  )

  app.delete(
    '/currency/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const idSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = idSchema.parse(request.params)

      const currencyStockExists = await prismaClient.currencyStock.findFirst({
        where: { id },
      })

      if (!currencyStockExists) {
        reply.status(statusCode.NOT_FOUND).send()
      }

      const deletedCurrencyStock = await prismaClient.currencyStock.delete({
        where: { id },
      })

      reply.status(statusCode.OK).send(deletedCurrencyStock)
    },
  )
}
