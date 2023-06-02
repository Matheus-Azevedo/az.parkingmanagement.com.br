import { FastifyReply, FastifyRequest } from 'fastify'
import { currencyServices } from '../services/currencyStock'
import { statusCode } from '../utils/statusCode'
import { bodySchema, idSchema } from '../validations/currencyStock'

async function getAll(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const { statusCode, data, message } = await currencyServices().getAll()
    if (message) {
      reply.status(statusCode).send({ message })
    } else {
      reply.status(statusCode).send({ data, message })
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function getOne(request: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(request.params)
  if (!id) {
    reply.status(statusCode.BAD_REQUEST).send({ message: 'Invalid params' })
  }
  try {
    const { status, data, message } = await currencyServices().getOne(id)
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send({ data, message })
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function create(request: FastifyRequest, reply: FastifyReply) {
  const { name, value, type, quantity } = bodySchema.parse(request.body)
  if (!name || !value || !type || !quantity) {
    reply.status(statusCode.BAD_REQUEST).send({ message: 'Invalid body' })
  }
  try {
    const { status, data, message } = await currencyServices().create({
      name,
      value,
      type,
      quantity,
    })
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send({ data })
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function update(request: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(request.params)
  const { quantity } = bodySchema.parse(request.body)
  if (!id || !quantity) {
    reply
      .status(statusCode.BAD_REQUEST)
      .send({ message: 'Invalid params or body' })
  }
  try {
    const { status, data, message } = await currencyServices().update(
      id,
      quantity,
    )
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send({ data })
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

async function deleteOne(request: FastifyRequest, reply: FastifyReply) {
  const { id } = idSchema.parse(request.params)
  if (!id) {
    reply.status(statusCode.BAD_REQUEST).send({ message: 'Invalid params' })
  }
  try {
    const { status, data, message } = await currencyServices().deleteOne(id)
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send({ data })
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

export function currencyControllers() {
  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
  }
}
