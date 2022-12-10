import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findActivityById(id: string): Promise<any> {

  const activity = await prisma.activity.findFirst({
    where: {id}
  })

  return activity
}

export {findActivityById}