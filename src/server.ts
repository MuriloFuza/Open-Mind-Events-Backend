import express, { Request, Response } from 'express'
import { createUser } from './users/useCases/createUsersUseCase/CreateUsersUseCase'
import { findUserById } from './users/useCases/findUserByIdUseCase/FindUserByIdUseCase'
import { findUserByCPF } from './users/useCases/findUserByCPFUseCase/FindUserByCPFUseCase'
import { findUserByEmail } from './users/useCases/findUserByEmailUseCase/FindUserByEmailUseCase'
import { findUserByKey } from './users/useCases/findUserByKeyUseCase/FindUserByKeyUseCase'
import { findEventByName } from './events/useCases/findEventByNameUseCase/FindEventByNameUseCase'
import { findEventById } from './events/useCases/findEventByIdUseCase/FindEventByIdUseCase'
import { createEvent } from './events/useCases/createEventUseCase/CreateEventUserCase'
import { createActivity } from './activity/createActivityByEventUseCase/CreateActivityByEventUseCase'
import { listEvents } from './events/useCases/listEventsUseCase/ListEventsUseCase'
import { registerInEvent } from './events/useCases/registerInEventUseCase/RegisterInEventUseCase'
import { listParticipants } from './events/useCases/listParticipantsUseCase/ListParticipantsUseCase'

const app = express()

app.use(express.json())

app.get(`/`, async (req: Request, res: Response) => {
    return res.json({message: 'True'})
})


//user
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
    console.log(error)
    return res.status(400).json({error: `Error: User not created`})
  }

})

app.get(`/user/findUserById`, async (req: Request, res: Response) => {

  try{
    const id = req.query.id as string;
    const event = await findUserById(id)

    return res.status(200).json(event)

  }catch(error){
    console.log(error)
    return res.status(400).json({error: `Error: Unable to find user`})
  }

})

app.get(`/user/findUserByCPF`, async (req: Request, res: Response) => {

  try{
    const cpf = req.query.cpf as string;
    const event = await findUserByCPF(cpf)

    return res.status(200).json(event)

  }catch(error){
    console.log(error)
    return res.status(400).json({error: `Error: Unable to find user`})
  }

})

app.get(`/user/findUserByEmail`, async (req: Request, res: Response) => {

  try{
    const email = req.query.email as string;
    const event = await findUserByEmail(email)

    return res.status(200).json(event)

  }catch(error){
    console.log(error)
    return res.status(400).json({error: `Error: Unable to find user`})
  }

})

app.get(`/user/findUserByKey`, async (req: Request, res: Response) => {

  try{
    const key = req.query.key as string;
    const event = await findUserByKey(key)

    return res.status(200).json(event)

  }catch(error){
    console.log(error)
    return res.status(400).json({error: `Error: Unable to find user`})
  }

})

//end user

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
    return res.status(400).json({error: `Error: Event not created`})
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

app.post(`/event/registerInEvent`, async (req: Request, res: Response) => {

  const {
    eventId,
    userKey
  } = req.body

  try{
    const result = await registerInEvent({
      eventId,
      userKey
    })
  
    if(result == true){
      return res.status(200).json({message: "Successfully registered!"})
    }

  }catch(error){
    console.log(error)
    return res.status(400).json({error: `Error: Could not register:`})
  }


})

app.get(`/event/listParticipants`, async (req: Request, res: Response) => {

  const {
    eventId
  } = req.body

  try{
    const list = await listParticipants({
      eventId
    })
  
    if( list.length === 0 ){
      return res.status(200).json({message: "There are no participants in this event" })
    }
  
    return res.status(200).json({list})
  }
  catch(error){
    console.log(error)
    return res.status(400).json({error: "Error: It was not possible to list the participants of the event"})
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
    console.log(error)
    return res.json({error: `Error: Activity not created`, })
  }

})

//end activity



app.listen(3000, () => console.log(`
🚀 Server ready at: http://localhost:3000`))