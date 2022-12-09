import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

async function findEventByName(name: string): Promise<any> {

  const event = await prisma.event.findFirst({
    where: {name}
  })

  return event
}

export {findEventByName}