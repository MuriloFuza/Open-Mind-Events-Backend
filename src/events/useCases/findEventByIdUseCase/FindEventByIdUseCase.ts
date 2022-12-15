import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findEventById(id: any): Promise<any> {

  const event = await prisma.event.findFirst({
    where: {id}
  })

  return event
}

export {findEventById}