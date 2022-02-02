export type User = { id: number; name: string; surname: string }

export type CreateUser = Omit<User, 'id'>

export interface IUserRepository {
	createUser: ({ name, surname }: CreateUser) => Promise<User | null>

	getUsers: () => Promise<User[]>

	getOneUser: (id: number) => Promise<User | null>

	updateUser: ({ id, name, surname }: User) => Promise<User | null>

	deleteUser: (id: number) => Promise<number>
}
