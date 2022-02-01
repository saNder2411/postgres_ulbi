import { Request, Response } from 'express'
import { pool } from '../db'

export interface User {
	id: number
	name: string
	surname: string
}

export class UserController {
	public async createUser(req: Request, res: Response): Promise<void> {
		const { name, surname } = req.body
		const newUser = await pool.query(`INSERT INTO person (name, surname) VALUES ($1, $2) RETURNING *`, [name, surname])

		res.json(newUser.rows[0])
	}

	public async getUsers(req: Request, res: Response): Promise<void> {
		const users = await pool.query(`SELECT * FROM person`)

		res.json(users.rows)
	}

	public async getOneUser(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const user = await pool.query(`SELECT * FROM person where id = $1`, [id])

		res.json(user.rows[0])
	}

	public async updateUser(req: Request, res: Response): Promise<void> {
		const { id, name, surname } = req.body

		const user = await pool.query(`UPDATE person set name = $1, surname = $2 WHERE id = $3 RETURNING *`, [
			name,
			surname,
			id,
		])
		res.json(user.rows[0])
	}

	public async deleteUser(req: Request, res: Response): Promise<void> {
		const id = req.params.id
		const user = await pool.query(`DELETE FROM person where id = $1`, [id])

		res.json(user.rows[0])
	}
}

export const userController = new UserController()
