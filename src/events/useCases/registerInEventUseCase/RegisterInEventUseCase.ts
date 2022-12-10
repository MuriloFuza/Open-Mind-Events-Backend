import { PrismaClient } from "@prisma/client";
import { findUserByKey } from "../../../users/useCases/findUserByKeyUseCase/FindUserByKeyUseCase";

const prisma = new PrismaClient()

interface IRequest{
  eventId: string,
  userKey: string
}

async function registerInEvent(data: IRequest): Promise<boolean>{

  try{

    const user = await findUserByKey(data.userKey)

    await prisma.list_participants_in_Events.create({
      data:{
        eventId: data.eventId,
        userId: user.id,
      }
    })

    return true
  }catch{
    return false
  }
  
}

export {registerInEvent}