import { Router } from 'express'
import { postController } from '../controller/post.controller'

const postsRouter = Router()

postsRouter.post('/posts', postController.createPost)
postsRouter.get('/posts', postController.getPostsByUserId)

export { postsRouter }
