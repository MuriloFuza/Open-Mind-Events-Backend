import {  PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function participantInEvent(eventId: any, userId: any): Promise<any>{

  const list = await prisma.list_participants_in_Events.findFirst({
    where: {
      eventId,
      userId
    },
    include: {
      participantsId: true
    }
  })
  


  return list

}
export {participantInEvent}
