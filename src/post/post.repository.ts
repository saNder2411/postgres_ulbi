import { inject, injectable } from 'inversify'

import { IPostgresService } from '../database/postgres.service'
import { TYPES } from '../types'
import { CreatePost, IPostRepository, Post } from './post.repository.interface'

@injectable()
export class PostRepository implements IPostRepository {
	constructor(@inject(TYPES.IPostgresService) private postgresService: IPostgresService) {}

	public async createPost({ title, content, userId }: CreatePost): Promise<Post | null> {
		const result = await this.postgresService.pool.query<Post>(
			`INSERT INTO post (title, content, user_id) VALUES ($1, $2, $3) RETURNING *`,
			[title, content, userId]
		)

		const post = result.rows[0]

		return post ? post : null
	}

	public async getPostsByUserId(userId: number): Promise<Post[]> {
		const result = await this.postgresService.pool.query<Post>(`SELECT * FROM post where user_id = $1`, [userId])

		return result.rows
	}
}
