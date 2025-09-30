import { UserRepository } from '@/repositories/user-repository'
import { User } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetUserProfileUseCaseRequest {
    userId: string
}

interface GetUserProfileUseCaseResponse {
    user: User
}

export class GetUserProfileUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ userId }: GetUserProfileUseCaseRequest) : Promise <GetUserProfileUseCaseResponse> {
        const user = await this.userRepository.findId(userId)

        if (!user) {
            throw new ResourceNotFound()
        }

        return { user }
    }
}