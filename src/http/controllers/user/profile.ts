import { makeGetUserProfileUseCase } from '@/use-case/factories/make-get-user-profile-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'


export async function profile(req: FastifyRequest, reply: FastifyReply) {
    const userProfile = makeGetUserProfileUseCase()

    const { user } = await userProfile.execute({
        userId: req.user.sub
    })

    return reply.status(200).send({
        ...user,
        password_hash: undefined
    })
}