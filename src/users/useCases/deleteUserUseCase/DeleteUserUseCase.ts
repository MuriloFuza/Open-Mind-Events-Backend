import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function deleteUser(id: string): Promise<void> {

  await prisma.user.delete({
    where: {
        id: id
    }
  })

}

export {deleteUser}