import { InMemoryUserRepository } from '@/repositories/in-memory-db/in-memory-user-repository'
import { AuthenticateUseCase } from './authenticate'
import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InvalidCredentials } from './errors/invalid-credentials'

let userRepository: InMemoryUserRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new AuthenticateUseCase(userRepository)
    })

    it('should be able to auth a user', async () => {
       await userRepository.create({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password_hash: await hash('123456', 6)
       })

       const { user } = await sut.execute({
            email: 'ronaldo@email.com',
            password: '123456'
       })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to auth with a wrong email', async () => {
        await expect(() => 
            sut.execute({
                email: 'ronaldo@email.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('should not be able to auth with a wrong password', async () => {
        await userRepository.create({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password_hash: await hash('123456', 6)
       })

        await expect(() => 
            sut.execute({
                email: 'ronaldo@email.com',
                password: '123123'
            })
        ).rejects.toBeInstanceOf(InvalidCredentials)
    })
})