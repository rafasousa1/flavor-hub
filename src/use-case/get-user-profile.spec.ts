import { InMemoryUserRepository } from '@/repositories/in-memory-db/in-memory-user-repository'
import { GetUserProfileUseCase } from './get-user-profile'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { ResourceNotFound } from './errors/resource-not-found'

let userRepository: InMemoryUserRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new GetUserProfileUseCase(userRepository)
    })

    it('should be able to show a user profile', async () => {
        const createdUser = await userRepository.create({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.name).toEqual('Ronaldo')
    })

    it('should not be able to show a user profile with wrong id', async () => {
        await expect(() => 
            sut.execute({
                userId: 'non-existing-id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })
})