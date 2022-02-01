import { Request, Response } from 'express'
import { pool } from '../db'

class PostController {
	public async createPost(req: Request, res: Response): Promise<void> {
		const { title, content, userId } = req.body
		const newPost = await pool.query(`INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`, [
			title,
			content,
			userId,
		])

		res.json(newPost.rows[0])
	}

	public async getPostsByUserId(req: Request, res: Response): Promise<void> {
		const id = req.query.id
		const posts = await pool.query(`SELECT * FROM post where user_id = $1`, [id])

		res.json(posts.rows)
	}
}

export const postController = new PostController()
