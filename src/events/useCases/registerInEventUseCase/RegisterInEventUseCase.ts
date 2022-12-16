import { PrismaClient } from "@prisma/client";
import { findUserByKey } from "../../../users/useCases/findUserByKeyUseCase/FindUserByKeyUseCase";

const prisma = new PrismaClient()

interface IRequest{
  eventId: string,
  userId: string
}

async function registerInEvent(data: IRequest): Promise<boolean>{

  await prisma.list_participants_in_Events.create({
    data:{
      eventId: data.eventId,
      userId: data.userId,
    }
  })

  return true
}

export {registerInEvent}