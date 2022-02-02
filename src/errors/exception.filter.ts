import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { ILoggerService } from '../logger/logger.service'
import { TYPES } from '../types'

export interface IExceptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void
}

export class HttpError extends Error {
	constructor(public statusCode: number, message: string, public errorCtx?: string) {
		super(message)
	}
}

@injectable()
export class ExceptionFilter implements IExceptionFilter {
	constructor(@inject(TYPES.ILoggerService) private loggerService: ILoggerService) {}

	catch(err: Error | HttpError, req: Request, res: Response, next: NextFunction) {
		if (err instanceof HttpError) {
			this.loggerService.error(`[${err?.errorCtx ?? ''}] Error ${err.statusCode}: ${err.message}`)
			return res.status(err.statusCode).send({ error: err.message })
		}

		this.loggerService.error(`${err.message}`)
		res.status(500).send({ error: err.message })
	}
}
