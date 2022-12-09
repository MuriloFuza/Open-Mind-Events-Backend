import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

interface IEventRequest {
  name: string,
  init_date: Date,
  end_date: Date,
  visible: boolean,
  banner_url: string,
  creator: User,
}

async function createEvent(data: IEventRequest): Promise<string> {

  const event = await prisma.event.create({
    data:{
      name: data.name,
      init_date: data.init_date,
      end_date: data.end_date,
      visible: data.visible,
      banner_url: data.banner_url,
      creator: {
        connect: {
            id: data.creator.id
        }
      }
    }
  })

  return event.id
}

export {createEvent}