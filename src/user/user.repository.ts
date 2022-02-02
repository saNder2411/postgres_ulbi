import 'reflect-metadata'

import { inject, injectable } from 'inversify'

import { IPostgresService } from '../database/postgres.service'
import { TYPES } from '../types'
import { IUserRepository, User, CreateUser } from './user.repository.interface'

@injectable()
export class UserRepository implements IUserRepository {
	constructor(@inject(TYPES.IPostgresService) private postgresService: IPostgresService) {}

	public async createUser({ name, surname }: CreateUser): Promise<User | null> {
		const result = await this.postgresService.pool.query<User>(
			`INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *`,
			[name, surname]
		)

		const user = result.rows[0]

		return user ? user : null
	}

	public async getUsers(): Promise<User[]> {
		const result = await this.postgresService.pool.query<User>(`SELECT * FROM person`)

		return result.rows
	}

	public async getOneUser(id: number): Promise<User | null> {
		const result = await this.postgresService.pool.query<User>(`SELECT * FROM person where id = $1`, [id])

		const user = result.rows[0]

		return user ? user : null
	}

	public async updateUser({ id, name, surname }: User): Promise<User | null> {
		const result = await this.postgresService.pool.query<User>(
			`UPDATE person set name = $1, surname = $2 WHERE id = $3 RETURNING *`,
			[name, surname, id]
		)

		const user = result.rows[0]

		return user ? user : null
	}

	public async deleteUser(id: number): Promise<number> {
		const result = await this.postgresService.pool.query(`DELETE FROM person where id = $1`, [id])

		return result.rows[0] as number
	}
}
