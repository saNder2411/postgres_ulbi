import 'reflect-metadata'

import { inject, injectable } from 'inversify'
import { Pool, PoolClient } from 'pg'

import { IConfigService } from '../config/config.service'
import { ILoggerService } from '../logger/logger.service'
import { TYPES } from '../types'

export interface IPostgresService {
	pool: Pool
	client: PoolClient | null
	readonly configService: IConfigService
	readonly loggerService: ILoggerService
	connect: () => Promise<void>
}

@injectable()
export class PostgresService implements IPostgresService {
	pool: Pool
	client: PoolClient | null = null
	constructor(
		@inject(TYPES.IConfigService) readonly configService: IConfigService,
		@inject(TYPES.ILoggerService) readonly loggerService: ILoggerService
	) {
		this.pool = new Pool({
			user: this.configService.get('DB_USER'),
			password: this.configService.get('DB_PASSWORD'),
			host: 'localhost',
			port: 5432,
			database: this.configService.get('DB_NAME'),
		})
	}

	public async connect() {
		try {
			this.client = await this.pool.connect()
			this.loggerService.log('[PostgresService] connect to db')
		} catch (err) {
			if (err instanceof Error) this.loggerService.error(`[PostgresService] Error connect to db ${err.message}`)
		}
	}
}
