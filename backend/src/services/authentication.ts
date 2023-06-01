import { statusCode } from '../utils/statusCode'
import { iLogin, iRegister } from '../interfaces/authentication'
import prismaClient from '../database/prismaClient'
import app from '../server'
import bcrypt from 'bcryptjs'

async function login(loginInfo: iLogin) {
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginInfo.email,
    },
  })

  if (!user) {
    return { status: statusCode.NOT_FOUND, message: 'User not found' }
  } else {
    const token = app.jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )

    return { status: statusCode.OK, token }
  }
}

async function register(registerInfo: iRegister) {
  let user = await prismaClient.user.findUnique({
    where: {
      email: registerInfo.email,
    },
  })

  if (!user) {
    const saltRounds = 13
    const hashedPassword = await bcrypt.hash(registerInfo.password, saltRounds)

    user = await prismaClient.user.create({
      data: {
        name: registerInfo.name,
        email: registerInfo.email,
        password: hashedPassword,
        role: registerInfo.role,
      },
    })
    const token = app.jwt.sign(
      {
        name: user.name,
        email: user.email,
        role: user.role,
      },
      {
        sub: user.id,
        expiresIn: '7 days',
      },
    )
    return { status: statusCode.CREATED, token }
  } else {
    return { status: statusCode.CONFLICT, message: 'User already exists' }
  }
}

export function authenticationServices() {
  return {
    login,
    register,
  }
}
