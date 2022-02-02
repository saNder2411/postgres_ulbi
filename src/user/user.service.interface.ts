import { CreateUser, User } from './user.repository.interface'

export interface IUserService {
	createUser: ({ name, surname }: CreateUser) => Promise<User | null>

	getUsers: () => Promise<User[]>

	getOneUser: (id: number) => Promise<User | null>

	updateUser: ({ id, name, surname }: User) => Promise<User | null>

	deleteUser: (id: number) => Promise<number>
}
