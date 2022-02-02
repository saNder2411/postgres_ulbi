import { NextFunction, Request, Response, Router } from 'express'

import { CreatePost } from './post.repository.interface'

export interface IPostController {
	router: Router

	createPost: ({ body }: Request<{}, {}, CreatePost>, res: Response, next: NextFunction) => Promise<void>

	getPostsByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>
}
