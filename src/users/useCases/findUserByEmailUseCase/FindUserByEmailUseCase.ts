import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findUserByEmail(email: string): Promise<any> {

  const user = await prisma.user.findFirst({
    where: {email}
  })

  return user
}

export {findUserByEmail}