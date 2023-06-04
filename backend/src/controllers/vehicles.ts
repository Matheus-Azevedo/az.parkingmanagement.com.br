import { FastifyReply, FastifyRequest } from 'fastify'
import { vehiclesServices } from '../services/vehicles'
import { statusCode } from '../utils/statusCode'
import { bodySchema, idSchema } from '../validations/vehicles'

async function getAll(request: FastifyRequest, reply: FastifyReply) {
  const { user } = request
  try {
    const { status, data, message } = await vehiclesServices().getAll(user)
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send(data)
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(request.params)
  const { user } = request
  try {
    const { status, data, message } = await vehiclesServices().getOne(id, user)
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send(data)
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function create(request: FastifyRequest, reply: FastifyReply) {
  const { plaque, model } = bodySchema.parse(request.body)
  const { user } = request
  try {
    const { status, data, message } = await vehiclesServices().create(
      plaque,
      model,
      user,
    )
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send(data)
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(request.params)
  const { plaque, model } = bodySchema.parse(request.body)
  try {
    const { status, data, message } = await vehiclesServices().update(
      id,
      plaque,
      model,
    )
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send(data)
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function deleteOne(request: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(request.params)
  try {
    const { status, message } = await vehiclesServices().deleteOne(id)
    if (message) {
      reply.status(status).send({ message })
    }
    reply.status(status).send()
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

export function vehiclesControllers() {
  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
  }
}
