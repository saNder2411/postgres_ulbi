import { NextFunction, Request, Response, Router } from 'express'

import { CreateUser, User } from './user.repository.interface'

export interface IUserController {
	router: Router

	createUser: ({ body }: Request<{}, {}, CreateUser>, res: Response, next: NextFunction) => Promise<void>

	getUsers: (req: Request, res: Response) => Promise<void>

	getOneUser: (req: Request, res: Response, next: NextFunction) => Promise<void>

	updateUser: ({ body }: Request<{}, {}, User>, res: Response, next: NextFunction) => Promise<void>

	deleteUser: (req: Request, res: Response) => Promise<void>
}
