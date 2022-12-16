import { Activity, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

interface IRequest {
  name: string,
  init_date: Date,
  end_date: Date,
  speaker_name: string,
  event_id: string,
}

async function createActivity(data: IRequest): Promise<Activity>{

  const activity = await prisma.activity.create({
    data: {
      name: data.name,
      speaker_name: data.speaker_name,
      init_date: new Date( data.init_date),
      end_date: new Date( data.end_date),
      eventId: data.event_id,
      Event: {
        connect: {
          id: data.event_id
        }
      }
    }
  })

  return activity
}

export {createActivity}