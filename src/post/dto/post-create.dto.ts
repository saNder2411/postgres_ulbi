import { IsString } from 'class-validator'

export class PostCreateDTO {
	@IsString({ message: 'Name not specified!' })
	public title: string

	@IsString({ message: 'Surname not specified!' })
	public content: string

	@IsString({ message: 'UserId not specified!' })
	public userId: string

	constructor(title: string, content: string, userId: string) {
		this.title = title
		this.content = content
		this.userId = userId
	}
}
