import { statusCode } from '../utils/statusCode'
import prismaClient from '../database/prismaClient'
import { iUser } from '../interfaces/users'
import bcrypt from 'bcryptjs'

async function getAll() {
  const user = await prismaClient.user.findMany()
  if (!user) {
    return { statusCode: statusCode.NOT_FOUND, message: 'Not found' }
  }
  return { statusCode: statusCode.OK, data: user }
}

async function getOne(id: string) {
  const user = await prismaClient.user.findUnique({
    where: { id },
  })
  if (!user) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }
  return { status: statusCode.OK, data: user }
}

async function create(userInfo: iUser) {
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
    return { status: statusCode.CREATED, data: user }
  } else {
    return { status: statusCode.CONFLICT, message: 'User already exists' }
  }
}

async function update(id: string, userInfo: iUser) {
  const userExists = await prismaClient.user.findFirst({
    where: { id },
  })
  if (!userExists) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  } else {
    const updatedUser = await prismaClient.user.update({
      where: { id },
      data: {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
        role: userInfo.role,
        credit: userInfo.credit,
      },
    })
    return { status: statusCode.OK, data: updatedUser }
  }
}

async function deleteOne(id: string) {
  const userExists = await prismaClient.user.findFirst({
    where: { id },
  })

  if (!userExists) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }

  await prismaClient.user.delete({
    where: { id },
  })

  return { status: statusCode.DELETED }
}

export function usersServices() {
  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
  }
}
