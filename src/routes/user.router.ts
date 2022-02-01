import { Router } from 'express'
import { userController } from '../controller/user.controller'

const usersRouter = Router()

usersRouter.post('/users', userController.createUser)
usersRouter.get('/users', userController.getUsers)
usersRouter.get('/users/:id', userController.getOneUser)
usersRouter.put('/users', userController.updateUser)
usersRouter.delete('/users/:id', userController.deleteUser)

export { usersRouter }
