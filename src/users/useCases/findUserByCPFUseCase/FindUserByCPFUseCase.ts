import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findUserByCPF(cpf: string): Promise<any> {

  const user = await prisma.user.findFirst({
    where: {cpf}
  })

  return user
}

export {findUserByCPF}