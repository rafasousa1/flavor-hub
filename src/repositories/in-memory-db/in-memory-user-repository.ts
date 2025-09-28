import { Prisma, User } from '@prisma/client'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
    private data: User[] = []

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            name: data.name ?? null,
            email: data.email,
            password_hash: data.password_hash
        }

        this.data.push(user)

        return user
    }

    async findEmail(email: string) {
        const user = this.data.find((item) => item.email === email)

        if (!user) {
            return null
        }

        return user

    }
}