import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { statusCode } from '../utils/statusCode'
import prismaClient from '../database/prismaClient'
import { z } from 'zod'
import dayjs from 'dayjs'

export async function vehiclesRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request: FastifyRequest) => {
    await request.jwtVerify()
  })

  app.get(
    '/vehicles',
    async (_request: FastifyRequest, reply: FastifyReply) => {
      const vehicles = await prismaClient.vehicle.findMany()
      if (!vehicles) {
        reply.status(statusCode.NOT_FOUND).send()
      }
      reply.status(statusCode.OK).send(vehicles)
    },
  )

  app.get(
    '/vehicles/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const idSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = idSchema.parse(request.params)
      const vehicle = await prismaClient.vehicle.findUnique({
        where: { id },
      })
      if (!vehicle) {
        reply.status(statusCode.NOT_FOUND).send()
      }
      reply.status(statusCode.OK).send(vehicle)
    },
  )

  app.post(
    '/vehicles',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const bodySchema = z.object({
        plaque: z.string(),
        model: z.string(),
      })

      const { plaque, model } = bodySchema.parse(request.body)

      const vehicleExists = await prismaClient.vehicle.findFirst({
        where: { plaque },
      })

      if (vehicleExists) {
        reply.status(statusCode.CONFLICT).send()
      }

      const newVehicle = await prismaClient.vehicle.create({
        data: {
          plaque,
          model,
          entry: dayjs(new Date()).format('ss:mm:HH DD/MM/YYYY'),
        },
      })

      reply.status(statusCode.CREATED).send(newVehicle)
    },
  )

  app.put(
    '/vehicles/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const idSchema = z.object({
        id: z.string().uuid(),
      })
      const bodySchema = z.object({
        exit: z.string(),
        totalSpent: z.number(),
        amountPaid: z.number(),
        credit: z.number(),
      })

      const { id } = idSchema.parse(request.params)
      const { exit, totalSpent, amountPaid, credit } = bodySchema.parse(
        request.body,
      )

      const vehicleExists = await prismaClient.vehicle.findUnique({
        where: { id },
      })

      if (!vehicleExists) {
        reply.status(statusCode.NOT_FOUND).send()
      }

      const updateVehicle = await prismaClient.vehicle.update({
        where: { id },
        data: {
          exit,
          totalSpent,
          amountPaid,
          credit,
        },
      })

      reply.status(statusCode.OK).send(updateVehicle)
    },
  )

  app.delete(
    '/vehicles/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      const idSchema = z.object({
        id: z.string().uuid(),
      })
      const { id } = idSchema.parse(request.params)

      const vehicleExists = await prismaClient.vehicle.findUnique({
        where: { id },
      })

      if (!vehicleExists) {
        reply.status(statusCode.NOT_FOUND).send()
      }

      await prismaClient.vehicle.delete({
        where: { id },
      })

      reply.status(statusCode.DELETED).send()
    },
  )
}
