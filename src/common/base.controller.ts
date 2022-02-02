import 'reflect-metadata'

import { Response, Router } from 'express'
import { injectable } from 'inversify'

import { ILoggerService } from '../logger/logger.service'
import { ControllerRoute } from './route.interface'

@injectable()
export abstract class BaseController {
	readonly _router: Router = Router()

	constructor(public loggerService: ILoggerService) {}

	get router() {
		return this._router
	}

	send<T>(res: Response, code: number, data: T) {
		res.type('application/json')
		return res.status(code).json(data)
	}

	ok<T>(res: Response, data: T) {
		this.send(res, 200, data)
	}

	protected bindRoutes(routes: ControllerRoute[]) {
		routes.forEach((r) => {
			this.loggerService.log(`[${r.methodKey}] ${r.path}`)

			const middlewares = r.middlewares?.map((m) => m.execute.bind(m))

			const handler = r.callback.bind(this)

			const pipeline = middlewares ? [...middlewares, handler] : handler

			this.router[r.methodKey](r.path, pipeline)
		})
	}
}
