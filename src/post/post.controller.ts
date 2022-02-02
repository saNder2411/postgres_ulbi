import 'reflect-metadata'

import { NextFunction, Request, Response } from 'express'
import { inject, injectable } from 'inversify'

import { BaseController } from '../common/base.controller'
import { ValidateMiddleware } from '../common/validate.middleware'
import { HttpError } from '../errors/exception.filter'
import { ILoggerService } from '../logger/logger.service'
import { TYPES } from './../types'
import { PostCreateDTO } from './dto/post-create.dto'
import { IPostController } from './post.controller.interface'
import { CreatePost } from './post.repository.interface'
import { IPostService } from './post.service.interface'

@injectable()
export class PostController extends BaseController implements IPostController {
	constructor(
		@inject(TYPES.ILoggerService) public loggerService: ILoggerService,
		@inject(TYPES.IPostService) private postService: IPostService
	) {
		super(loggerService)
		this.bindRoutes([
			{
				path: '/posts',
				methodKey: 'post',
				callback: this.createPost,
				middlewares: [new ValidateMiddleware(PostCreateDTO)],
			},
			{
				path: '/posts',
				methodKey: 'get',
				callback: this.getPostsByUserId,
				middlewares: [],
			},
		])
	}

	public async createPost({ body }: Request<{}, {}, CreatePost>, res: Response, next: NextFunction): Promise<void> {
		const newPost = await this.postService.createPost(body)

		if (!newPost) return next(new HttpError(422, 'This user is already exists!'))

		this.loggerService.log(`[PostController] create post: ${newPost.title}`)

		this.ok(res, newPost)
	}

	public async getPostsByUserId(req: Request, res: Response, next: NextFunction): Promise<void> {
		const userId = req.params.id

		const posts = await this.postService.getPostsByUserId(+userId)

		this.ok(res, posts)
	}
}
