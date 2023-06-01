import { FastifyReply, FastifyRequest } from 'fastify'
import { iLogin, iRegister } from '../interfaces/authentication'
import { authenticationServices } from '../services/authentication'
import { statusCode } from '../utils/statusCode'
import { loginSchema, registerSchema } from '../validations/authentication'

async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginInfo: iLogin = loginSchema.parse(request.body)

  if (!loginInfo) {
    reply
      .status(statusCode.BAD_REQUEST)
      .send({ message: 'Invalid login information' })
  }

  try {
    const { status, message, token } = await authenticationServices().login(
      loginInfo,
    )
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send({ token })
    }
  } catch (error) {
    reply
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' })
  }
}

async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerInfo: iRegister = registerSchema.parse(request.body)

  if (!registerInfo) {
    reply
      .status(statusCode.BAD_REQUEST)
      .send({ message: 'Invalid login information' })
  }

  try {
    const { status, message, token } = await authenticationServices().register(
      registerInfo,
    )
    if (message) {
      reply.status(status).send({ message })
    } else {
      reply.status(status).send({ token })
    }
  } catch (error) {
    reply
      .status(statusCode.INTERNAL_SERVER_ERROR)
      .send({ message: 'Internal server error' })
  }
}

export function authenticationControllers() {
  return {
    login,
    register,
  }
}
