import { statusCode } from '../utils/statusCode'
import prismaClient from '../database/prismaClient'
import { iCurrency } from '../interfaces/ currencyStock'

async function getAll() {
  const currencyStock = await prismaClient.currencyStock.findMany()
  if (!currencyStock) {
    return { statusCode: statusCode.NOT_FOUND, message: 'Not found' }
  }
  return { statusCode: statusCode.OK, data: currencyStock }
}

async function getOne(id: string) {
  const currencyStock = await prismaClient.currencyStock.findUnique({
    where: { id },
  })
  if (!currencyStock) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }
  return { status: statusCode.OK, data: currencyStock }
}

async function create({ value, type, quantity, origin }: iCurrency) {
  const currencyStockExists = await prismaClient.currencyStock.findFirst({
    where: { value },
  })

  if (currencyStockExists) {
    return { status: statusCode.CONFLICT, message: 'Conflict' }
  }

  const newCurrencyStock = await prismaClient.currencyStock.create({
    data: {
      value,
      type,
      quantity,
      origin,
    },
  })

  return { status: statusCode.CREATED, data: newCurrencyStock }
}

async function update(id: string, quantity: number) {
  const currencyStockExists = await prismaClient.currencyStock.findFirst({
    where: { id },
  })
  if (!currencyStockExists) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  } else {
    const updatedCurrencyStock = await prismaClient.currencyStock.update({
      where: { id },
      data: {
        quantity: quantity + currencyStockExists.quantity,
      },
    })
    return { status: statusCode.OK, data: updatedCurrencyStock }
  }
}

async function deleteOne(id: string) {
  const currencyStockExists = await prismaClient.currencyStock.findFirst({
    where: { id },
  })

  if (!currencyStockExists) {
    return { status: statusCode.NOT_FOUND, message: 'Not found' }
  }

  await prismaClient.currencyStock.delete({
    where: { id },
  })

  return { status: statusCode.DELETED }
}

export function currencyServices() {
  return {
    getAll,
    getOne,
    create,
    update,
    deleteOne,
  }
}
