import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteEvent(id: string): Promise<void> {

  await prisma.event.delete({
    where: {
        id: id
    }
  })

}

export {deleteEvent}