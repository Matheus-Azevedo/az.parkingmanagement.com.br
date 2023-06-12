import { FastifyReply, FastifyRequest } from 'fastify'
import { usersServices } from '../services/users'
import { statusCode } from '../utils/statusCode'
import { bodySchema, idSchema } from '../validations/users'
import { iUser } from '../interfaces/users'

async function getAll(_request: FastifyRequest, reply: FastifyReply) {
  try {
    const { statusCode, data, message } = await usersServices().getAll()
    if (message) {
      reply.status(statusCode).send({ message })
    } else {
      reply.status(statusCode).send(data)
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
    const { status, data, message } = await usersServices().getOne(id)
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
  const userInfo: iUser = bodySchema.parse(request.body)

  if (!userInfo) {
    reply
      .status(statusCode.BAD_REQUEST)
      .send({ message: 'Invalid register information' })
  }

  try {
    const { status, message, data } = await usersServices().create(userInfo)
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
  const userInfo: iUser = bodySchema.parse(request.body)
  if (!id || !userInfo) {
    reply
      .status(statusCode.BAD_REQUEST)
      .send({ message: 'Invalid params or body' })
  }
  try {
    const { status, data, message } = await usersServices().update(id, userInfo)
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
  if (!id) {
    reply.status(statusCode.BAD_REQUEST).send({ message: 'Invalid params' })
  }
  try {
    const { status, message } = await usersServices().deleteOne(id)
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send()
    }
  } catch (error) {
    reply.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: error })
  }
}

export function usersControllers() {
  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
  }
}
