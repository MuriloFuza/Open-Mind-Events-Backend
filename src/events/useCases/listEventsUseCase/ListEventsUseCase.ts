import { Event, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient()

async function listEvents(): Promise<Event[]>{

  const events = await prisma.event.findMany({
    where:{
      visible: true
    },
    include:{
      activity: true
    }
  })

  return events

}

export{listEvents}