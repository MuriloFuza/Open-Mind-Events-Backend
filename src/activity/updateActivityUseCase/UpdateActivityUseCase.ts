import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface IActivityRequest {
    id: string,
    name: string,
    init_date: Date,
    end_date: Date,
    speaker_name: string,
    event_id: string,
}

async function updateActivity(data: IActivityRequest): Promise<void> {

  await prisma.activity.update({
    where: {
        id: data.id,
    },
    data: {
        name: data.name,
        speaker_name: data.speaker_name,
        init_date: data.init_date,
        end_date: data.end_date,
        eventId: data.event_id,
        Event: {
          connect: {
            id: data.event_id
          }
        }
      }
  })

}

export {updateActivity}