import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findUserByKey(key: string): Promise<any> {

  const user = await prisma.user.findFirst({
    where: {key}
  })

  return user
}

export {findUserByKey}