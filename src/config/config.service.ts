import 'reflect-metadata'

import { config, DotenvParseOutput } from 'dotenv'
import { inject, injectable } from 'inversify'

import { ILoggerService } from '../logger/logger.service'
import { TYPES } from '../types'

export interface IConfigService {
	readonly config: DotenvParseOutput | null
	get: (key: string) => string
}

@injectable()
export class ConfigService implements IConfigService {
	readonly config: DotenvParseOutput | null = null

	constructor(@inject(TYPES.ILoggerService) private logger: ILoggerService) {
		const result = config()

		if (result.error) this.logger.error('[ConfigService] The file could not be read or is missing')

		if (result.parsed) {
			this.config = result.parsed as DotenvParseOutput
			this.logger.log('[ConfigService] Config .env uploaded')
		}
	}

	public get(key: string) {
		if (!this.config) return ''

		return this.config[key]
	}
}
