import { statusCode } from '../utils/statusCode'
import prismaClient from '../database/prismaClient'
import { iUser } from '../interfaces/vehicles'

async function getAll(user: iUser) {
  let vehicles = []
  if (user.role === 'admin') {
    vehicles = await prismaClient.vehicle.findMany({
      orderBy: {
        entry: 'asc',
      },
    })
  } else {
    vehicles = await prismaClient.vehicle.findMany({
      where: {
        userId: user.sub,
      },
      orderBy: {
        entry: 'asc',
      },
    })
  }

  if (!vehicles) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }
  return { status: statusCode.OK, data: vehicles }
}

async function getOne(id: string, user: iUser) {
  const vehicle = await prismaClient.vehicle.findUnique({
    where: { id },
  })
  if (!vehicle) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }
  if (vehicle?.userId !== user.sub) {
    return { status: statusCode.UNAUTHORIZED, message: 'Unauthorized' }
  } else {
    return { status: statusCode.OK, data: vehicle }
  }
}

async function create(plaque: string, model: string, email: string) {
  const user = await prismaClient.user.findUnique({
    where: { email },
  })

  if (!user) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }

  const newVehicle = await prismaClient.vehicle.create({
    data: {
      plaque,
      model,
      entry: new Date(),
      userId: user.id,
    },
  })
  return { status: statusCode.CREATED, data: newVehicle }
}

async function update(
  id: string,
  exit: Date,
  totalTime: number,
  totalSpent: number,
  amountPaid: number,
  change: number,
) {
  const vehicleExists = await prismaClient.vehicle.findUnique({
    where: { id },
  })

  if (!vehicleExists) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }

  const updateVehicle = await prismaClient.vehicle.update({
    where: { id },
    data: {
      exit,
      totalTime,
      totalSpent,
      amountPaid,
      change,
    },
  })
  return { status: statusCode.OK, data: updateVehicle }
}

async function deleteOne(id: string) {
  const vehicleExists = await prismaClient.vehicle.findUnique({
    where: { id },
  })

  if (!vehicleExists) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }

  await prismaClient.vehicle.delete({
    where: { id },
  })

  return { status: statusCode.DELETED }
}

export function vehiclesServices() {
  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
  }
}
