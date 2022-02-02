import { IsNumber, IsString } from 'class-validator'

export class UserUpdateDTO {
	@IsNumber({}, { message: 'id not specified!' })
	public id: number

	@IsString({ message: 'Password not specified!' })
	public name: string

	@IsString({ message: 'Password not specified!' })
	public surname: string

	constructor(id: number, name: string, surname: string) {
		this.id = id
		this.name = name
		this.surname = surname
	}
}
