import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteActivity(id: string): Promise<void> {

  await prisma.activity.delete({
    where: {
        id: id
    }
  })

}

export {deleteActivity}