import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findUserById(id: string): Promise<any> {

  const user = await prisma.user.findFirst({
    where: {id}
  })

  return user
}

export {findUserById}