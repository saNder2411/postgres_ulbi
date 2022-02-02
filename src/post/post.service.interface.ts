import { Post, CreatePost } from './post.repository.interface'

export interface IPostService {
	createPost: ({ title, content, userId }: CreatePost) => Promise<Post | null>

	getPostsByUserId: (userId: number) => Promise<Post[]>
}
