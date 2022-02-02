import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { HttpError } from '../errors/exception.filter'
import { ILoggerService } from '../logger/logger.service'
import { TYPES } from './../types'
import { UserCreateDTO } from './dto/user-create.dto'
import { UserUpdateDTO } from './dto/user-update.dto'
import { IUserController } from './user.controller.interface'
import { IUserService } from './user.service.interface'
import { CreateUser, User } from './user.repository.interface'

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(
		@inject(TYPES.ILoggerService) public loggerService: ILoggerService,
		@inject(TYPES.IUserService) private userService: IUserService
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/users',
				methodKey: 'post',
				callback: this.createUser,
				middlewares: [new ValidateMiddleware(UserCreateDTO)],
			},
			{
				path: '/users',
				methodKey: 'get',
				callback: this.getUsers,
				middlewares: [],
			},
			{
				path: '/users/:id',
				methodKey: 'get',
				callback: this.getOneUser,
				middlewares: [],
			},
			{
				path: '/users',
				methodKey: 'put',
				callback: this.updateUser,
				middlewares: [new ValidateMiddleware(UserUpdateDTO)],
			},
			{
				path: '/users/:id',
				methodKey: 'delete',
				callback: this.deleteUser,
				middlewares: [],
			},
		])
	}
	public async createUser({ body }: Request<{}, {}, CreateUser>, res: Response, next: NextFunction): Promise<void> {
		const newUser = await this.userService.createUser(body)

		if (!newUser) return next(new HttpError(422, 'This user is already exists!'))

		this.loggerService.log(`[UserController] create user: ${newUser.name}`)

		this.ok(res, newUser)
	}

	public async getUsers(req: Request, res: Response): Promise<void> {
		const users = await this.userService.getUsers()

		this.ok(res, users)
	}

	public async getOneUser(req: Request, res: Response, next: NextFunction): Promise<void> {
		const id = req.params.id
		const user = this.userService.getOneUser(+id)

		if (!user) return next(new HttpError(422, `User with id: ${id} is not exists!`))

		this.ok(res, user)
	}

	public async updateUser({ body }: Request<{}, {}, User>, res: Response, next: NextFunction): Promise<void> {
		const user = await this.userService.updateUser(body)

		if (!user) return next(new HttpError(500, `Something was wrang!`))

		this.ok(res, user)
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const userId = await this.userService.deleteUser(+id)

		this.ok(res, userId)
	}
}
