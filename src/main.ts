import 'reflect-metadata'

import { Container, ContainerModule, interfaces } from 'inversify'

import { App } from './app'
import { ConfigService, IConfigService } from './config/config.service'
import { IPostgresService, PostgresService } from './database/postgres.service'
import { ExceptionFilter, IExceptionFilter } from './errors/exception.filter'
import { ILoggerService, LoggerService } from './logger/logger.service'
import { PostController } from './post/post.controller'
import { IPostController } from './post/post.controller.interface'
import { PostRepository } from './post/post.repository'
import { IPostRepository } from './post/post.repository.interface'
import { PostService } from './post/post.service'
import { IPostService } from './post/post.service.interface'
import { TYPES } from './types'
import { UserController } from './user/user.controller'
import { IUserController } from './user/user.controller.interface'
import { UserRepository } from './user/user.repository'
import { IUserRepository } from './user/user.repository.interface'
import { UserService } from './user/user.service'
import { IUserService } from './user/user.service.interface'

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILoggerService>(TYPES.ILoggerService).to(LoggerService).inSingletonScope()
	bind<IConfigService>(TYPES.IConfigService).to(ConfigService).inSingletonScope()
	bind<IExceptionFilter>(TYPES.IExceptionFilter).to(ExceptionFilter)
	bind<IPostgresService>(TYPES.IPostgresService).to(PostgresService).inSingletonScope()
	bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository).inSingletonScope()
	bind<IUserService>(TYPES.IUserService).to(UserService)
	bind<IUserController>(TYPES.IUserController).to(UserController)
	bind<IPostRepository>(TYPES.IPostRepository).to(PostRepository)
	bind<IPostService>(TYPES.IPostService).to(PostService)
	bind<IPostController>(TYPES.IPostController).to(PostController)
	bind<App>(TYPES.App).to(App)
})

const bootstrap = async () => {
	const appContainer = new Container()
	appContainer.load(appBindings)

	const app = appContainer.get<App>(TYPES.App)
	await app.init()

	return { app, appContainer }
}

export const boot = bootstrap()
