import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { compare } from 'bcryptjs'
import { InvalidCredentials } from './errors/invalid-credentials'

interface AuthenticateUseCaseRequest {
    email: string
    password: string
}

interface AuthenticateUseCaseResponse {
    user: User
}

export class AuthenticateUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({email, password}: AuthenticateUseCaseRequest) : Promise<AuthenticateUseCaseResponse> {
        const user = await this.userRepository.findEmail(email)

        if (!user) {
            throw new InvalidCredentials()
        }

        const doesPasswordMatches = await compare(password, user.password_hash)

        if (!doesPasswordMatches) {
            throw new InvalidCredentials()
        }

        return { user }
    }
}