import 'reflect-metadata'

import { injectable } from 'inversify'
import { Logger } from 'tslog'

export interface ILoggerService {
	readonly logger: unknown
	log: (...args: unknown[]) => void
	error: (...args: unknown[]) => void
	warn: (...args: unknown[]) => void
}

@injectable()
export class LoggerService implements ILoggerService {
	readonly logger: Logger = new Logger({
		displayInstanceName: false,
		displayLoggerName: false,
		displayFilePath: 'hidden',
		displayFunctionName: false,
	})

	public log(...args: unknown[]): void {
		this.logger.info(...args)
	}

	public error(...args: unknown[]): void {
		this.logger.error(...args)
	}

	public warn(...args: unknown[]): void {
		this.logger.warn(...args)
	}
}
