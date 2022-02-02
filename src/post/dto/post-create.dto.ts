import { IsString, IsNumber } from 'class-validator'

export class PostCreateDTO {
	@IsString({ message: 'Name not specified!' })
	public title: string

	@IsString({ message: 'Surname not specified!' })
	public content: string

	@IsNumber({}, { message: 'UserId not specified!' })
	public userId: number

	constructor(title: string, content: string, userId: number) {
		this.title = title
		this.content = content
		this.userId = userId
	}
}
