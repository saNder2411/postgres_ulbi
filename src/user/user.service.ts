import 'reflect-metadata'

import { inject, injectable } from 'inversify'

import { TYPES } from '../types'
import { CreateUser, IUserRepository, User } from './user.repository.interface'
import { IUserService } from './user.service.interface'

@injectable()
export class UserService implements IUserService {
	constructor(@inject(TYPES.IUserRepository) private userRepository: IUserRepository) {}

	public async createUser(newUser: CreateUser): Promise<User | null> {
		return await this.userRepository.createUser(newUser)
	}

	public async getUsers(): Promise<User[]> {
		return await this.userRepository.getUsers()
	}

	public async getOneUser(id: number): Promise<User | null> {
		return await this.userRepository.getOneUser(id)
	}

	public async updateUser(user: User): Promise<User | null> {
		return await this.userRepository.updateUser(user)
	}

	public async deleteUser(id: number): Promise<number> {
		return await this.userRepository.deleteUser(id)
	}
}
