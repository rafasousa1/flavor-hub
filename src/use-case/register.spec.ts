import { InMemoryUserRepository } from '@/repositories/in-memory-db/in-memory-user-repository'
import { RegisterUseCase } from './register'
import { beforeEach, describe, expect, it } from 'vitest'
import { compare } from 'bcryptjs'
import { UserAlreadyExist } from './errors/user-already-exist'

let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('should be able to register a user', async () => {
        const { user } = await sut.execute({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should be able to hash a password', async () => {
        const { user } = await sut.execute({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password: '123456'
        })

        const isPasswordHashed = await compare('123456', user.password_hash)
        expect(isPasswordHashed).toBe(true)
    })

    it('should be able to verify email', async () => {
        const email = 'ronaldo@email.com'

        await sut.execute({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password: '123456'
        })

        await expect(() => 
            sut.execute({
                name: 'Ronaldo',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExist)
    })
})