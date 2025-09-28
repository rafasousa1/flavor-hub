import { UserRepository } from "@/repositories/user-repository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExist } from "./errors/user-already-exist"

interface RegisterUseCaseRequest {
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private userRepository: UserRepository) {}

    async execute({ name, email, password }: RegisterUseCaseRequest) : Promise <RegisterUseCaseResponse> {

        const password_hash = await hash(password, 6) // 6 rounds

        const userWithSameEmail = await this.userRepository.findEmail(email)

        if (userWithSameEmail) {
            throw new UserAlreadyExist()
        }

        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })

        return { user }
    }
}