import express, { Request, Response } from 'express'
import { createUser } from './users/useCases/createUsersUseCase/CreateUsersUseCase'
import { findUserByCPF } from './users/useCases/findUserByCPFUseCase/FindUserByCPFUseCase'
import { findUserByEmail } from './users/useCases/findUserByEmailUseCase/FindUserByEmailUseCase'

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

app.listen(3000, () => console.log(`
🚀 Server ready at: http://localhost:3000`))