import { List_participants_in_Events, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


async function listParticipants(eventId: any): Promise<any>{

  const list = await prisma.list_participants_in_Events.findMany({
    where: {
      eventId
    },
    include: {
      participantsId: true
    }
  })
  
  const participants = list.map(i => i.participantsId.name)

  console.log(participants)

  return participants

}
export {listParticipants}
