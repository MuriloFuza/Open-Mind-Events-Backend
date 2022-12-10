import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface IUserRequest {
  id: string,
  name: string,
  email:  string,
  cpf:  string,
}

async function updateUser(data: IUserRequest): Promise<void> {

  await prisma.user.update({
    where: {
        id: data.id
    },
    data:{
      name: data.name,
      email: data.email,
      cpf: data.cpf,
    }
  })

}

export {updateUser}