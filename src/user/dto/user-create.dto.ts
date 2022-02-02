import { IsString } from 'class-validator'

export class UserCreateDTO {
	@IsString({ message: 'Name not specified!' })
	public name: string

	@IsString({ message: 'Surname not specified!' })
	public surname: string

	constructor(name: string, surname: string) {
		this.name = name
		this.surname = surname
	}
}
