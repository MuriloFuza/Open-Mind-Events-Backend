import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface IEventRequest {
    id: string,
    name: string,
    init_date: Date,
    end_date: Date,
    visible: boolean,
    banner_url: string,
    creator: string,
}

async function updateEvent(data: IEventRequest): Promise<void> {

  await prisma.event.update({
    where: {
        id: data.id,
    },
    data:{
      name: data.name,
      init_date: data.init_date,
      end_date: data.end_date,
      visible: true,
      banner_url: data.banner_url,
    }
  })

}

export {updateEvent}