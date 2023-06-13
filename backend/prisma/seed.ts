import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const users = [
    {
      name: 'Mayara',
      email: 'mayara.jp@gmail.com',
      password: '$2a$13$9Y2Vmt2TMdCN/lyiYnNPCu6U/rt/K68h6rX3FnQjYQoLuFeYqMOtK',
      role: 'user',
      credit: null,
    },
    {
      name: 'Sousa',
      email: 'sousa.jp@gmail.com',
      password: '$2a$13$9VcN.tZHFlU9uZkoVgZe6OX14Uhklr8oa5lk1cbvf7V1AEUL4936i',
      role: 'user',
      credit: 365,
    },
    {
      name: 'Matheus',
      email: 'matheuseduardo.jp@gmail.com',
      password: '$2a$13$/WLahUVwmGjAuLq8Brisp.jgjFvYT0WZsbqrZNnukqVe/uoECnHsG',
      role: 'admin',
      credit: null,
    },
    {
      name: 'Eduardo',
      email: 'eduardo.jp@gmail.com',
      password: '$2a$13$Psj7AadD/gE4Vo/ntou9u.vToUKJa7QoO2ZuawJdMnIz6bbF9Ld8m',
      role: 'user',
      credit: null,
    },
    {
      name: 'Azevedo',
      email: 'azevedo.jp@gmail.com',
      password: '$2a$13$KxNIMhap3SLZ8Ho96yENVesN/mTpiWkD1VxXEQhC2Yo6RvIjPa2Zi',
      role: 'admin',
      credit: null,
    },
  ]

  const currencyStock = [
    {
      value: '50',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '5',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '10',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '200',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '1',
      type: 'coin',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '0.25',
      type: 'coin',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '0.10',
      type: 'coin',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '2',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '0.05',
      type: 'coin',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '0,01',
      type: 'coin',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '20',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '100',
      type: 'bank-note',
      origin: 'BRL',
      quantity: 10,
    },
    {
      value: '0.50',
      type: 'coin',
      origin: 'BRL',
      quantity: 10,
    },
  ]

  const createdUsers = await prisma.user.createMany({
    data: users,
    skipDuplicates: true,
  })

  const createdCurrencyStock = await prisma.currencyStock.createMany({
    data: currencyStock,
    skipDuplicates: true,
  })

  console.log({ createdUsers, createdCurrencyStock })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
