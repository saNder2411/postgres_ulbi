export type Post = { id: string; title: string; content: string; userId: number }

export type CreatePost = Omit<Post, 'id'>

export interface IPostRepository {
	createPost: ({ title, content, userId }: CreatePost) => Promise<Post | null>

	getPostsByUserId: (userId: number) => Promise<Post[]>
}
