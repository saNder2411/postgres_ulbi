import 'reflect-metadata'

import express, { Express, json } from 'express'
import { Server } from 'http'
import { inject, injectable } from 'inversify'

import { IConfigService } from './config/config.service'
import { IPostgresService } from './database/postgres.service'
import { IExceptionFilter } from './errors/exception.filter'
import { ILoggerService } from './logger/logger.service'
import { TYPES } from './types'
import { IUserController } from './user/user.controller.interface'
import { IPostController } from './post/post.controller.interface'

@injectable()
export class App {
	app: Express
	server: Server | null = null

	constructor(
		@inject(TYPES.ILoggerService) private loggerService: ILoggerService,
		@inject(TYPES.IUserController) private userController: IUserController,
		@inject(TYPES.IPostController) private postController: IPostController,
		@inject(TYPES.IExceptionFilter) private exceptionFilter: IExceptionFilter,
		@inject(TYPES.IConfigService) private configService: IConfigService,
		@inject(TYPES.IPostgresService) private postgresService: IPostgresService
	) {
		this.app = express()
	}

	useMiddleware() {
		this.app.use(json())
	}

	useRoutes() {
		this.app.use('/api', this.userController.router)
		this.app.use('/api', this.postController.router)
	}

	useExceptionFilters() {
		this.app.use(this.exceptionFilter.catch.bind(this.exceptionFilter))
	}

	async init() {
		this.useMiddleware()
		this.useRoutes()
		this.useExceptionFilters()
		await this.postgresService.connect()

		this.server = this.app.listen(this.configService.get('PORT'), () => {
			this.loggerService.log(`Server run on: http://localhost:${this.configService.get('PORT')}`)
		})
	}

	close() {
		if (!this.server) return

		this.server.close()
	}
}
