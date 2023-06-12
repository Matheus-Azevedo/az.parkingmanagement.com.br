import { statusCode } from '../utils/statusCode'
import { iLogin } from '../interfaces/authentication'
import prismaClient from '../database/prismaClient'
import app from '../server'

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

export function authenticationServices() {
  return {
    login,
  }
}
