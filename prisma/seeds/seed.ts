import { PrismaClient } from "@prisma/client";
import {v4 as uuidv4} from "uuid";

const prisma = new PrismaClient

async function main(){

  const key = uuidv4();

  const admin = await prisma.user.upsert({
    where:{email: 'muriloacademix@gmail.com'},
    update: {},
    create: {
      cpf: '03218604206',
      email: 'muriloacademix@gmail.com',
      name: 'Murilo Fuza',
      role: 'ADMIN',
      key,
    }
  })

  console.log(admin)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })