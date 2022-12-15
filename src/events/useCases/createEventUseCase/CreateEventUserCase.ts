import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient()

interface IEventRequest {
  name: string,
  init_date: Date,
  end_date: Date,
  visible: boolean,
  banner_url: string,
  creator: string,
}

async function createEvent(data: IEventRequest): Promise<string> {

  const event = await prisma.event.create({
    data:{
      name: data.name,
      init_date: new Date(data.init_date),
      end_date:new Date( data.end_date),
      visible: data.visible,
      banner_url: data.banner_url,
      creator: {
        connect: {
            id: data.creator
        }
      }
    }
  })

  return event.id
}

export {createEvent}