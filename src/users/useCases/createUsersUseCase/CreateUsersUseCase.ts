import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4} from 'uuid'

const prisma = new PrismaClient()

interface IUserRequest {
  name: string,
  email:  string,
  cpf:  string,
}

async function createUser(data: IUserRequest): Promise<String> {

  const key = uuidv4();

  await prisma.user.create({
    data:{
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      role: "USER",
      key,
    }
  })

  return key
}

export {createUser}