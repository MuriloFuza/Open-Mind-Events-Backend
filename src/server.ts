import express, { Request, Response } from 'express'
import { createUser } from './users/useCases/createUsersUseCase/CreateUsersUseCase'
import { findUserByCPF } from './users/useCases/findUserByCPFUseCase/FindUserByCPFUseCase'
import { findUserByEmail } from './users/useCases/findUserByEmailUseCase/FindUserByEmailUseCase'
import { findEventByName } from './events/useCases/findEventByNameUseCase/FindEventByNameUseCase'
import { createEvent } from './events/useCases/createEventUseCase/CreateEventUserCase'
import { createActivity } from './activity/createActivityByEventUseCase/CreateActivityByEventUseCase'
import { listEvents } from './events/useCases/listEventsUseCase/ListEventsUseCase'

const app = express()

app.use(express.json())

app.get(`/`, async (req: Request, res: Response) => {
    return res.json({message: 'True'})
})

app.post(`/user/create`, async (req: Request, res: Response) => {
  
  const {
    name,
    email,
    cpf,
  } = req.body
  
  try {

    const emailAlreadyExists = await findUserByEmail(email)
    const cpfAlreadyExists = await findUserByCPF(cpf)

    if(emailAlreadyExists || cpfAlreadyExists){
      return res.json({error: "Email or CPF is already in use!"})
    }

    const key = await createUser({
      name,
      cpf,
      email,
    })

    return res.json({message: "User created!", key})

  } catch(error) {
    return res.status(400).json({error: `Error: User not created ${error}`})
  }

})


//events
app.post(`/event/create`, async (req: Request, res: Response) => {
  
  const {
    name,
    init_date,
    end_date,
    visible,
    banner_url,
    creator
  } = req.body
  
  try {

    const eventNameAlreadyExists = await findEventByName(name)

    if(eventNameAlreadyExists){
      return res.json({error: "Event already exists."})
    }

    const eventId = await createEvent({
      name,
      init_date,
      end_date,
      visible,
      banner_url,
      creator
    })

    return res.json({message: "Event created", eventId})

  } catch(error) {
    console.log(error)
    return res.status(400).json({error: `Error: Event not created ${error}`})
  }

})

app.get(`/event/list`, async (req: Request, res: Response) => {

  try{
    const events = await listEvents()

    return res.status(200).json(events)

  }catch(error){
    console.log(error)
    return res.status(400).json({error: `Error: Unable to list events`})
  }

})

// end events

//activity
app.post(`/activity/create`, async (req: Request, res: Response) => {

  const {
    name,
    init_date,
    end_date,
    speaker_name,
    event_id
  } = req.body

  try{

    const activity = await createActivity({
      name,
      init_date,
      end_date,
      speaker_name,
      event_id
    })

    return res.json({message: `Activity created`, activity})

  }catch(error){
    return res.json({error: `Error: Activity not created: ${error}`, })
  }

})

//end activity



app.listen(3000, () => console.log(`
🚀 Server ready at: http://localhost:3000`))