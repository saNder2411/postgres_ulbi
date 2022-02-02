import { inject, injectable } from 'inversify'

import { TYPES } from '../types'
import { IPostRepository, CreatePost, Post } from './post.repository.interface'
import { IPostService } from './post.service.interface'

@injectable()
export class PostService implements IPostService {
	constructor(@inject(TYPES.IPostRepository) private postRepository: IPostRepository) {}

	public async createPost(newPost: CreatePost): Promise<Post | null> {
		return await this.postRepository.createPost(newPost)
	}

	public async getPostsByUserId(userId: number): Promise<Post[]> {
		return await this.postRepository.getPostsByUserId(userId)
	}
}
