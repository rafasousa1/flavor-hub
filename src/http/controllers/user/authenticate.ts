import { InvalidCredentials } from '@/use-case/errors/invalid-credentials'
import { makeAuthenticateUseCase } from '@/use-case/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
    const userBodySchema = z.object({
        email: z.string(),
        password: z.string().min(6)
    })

    const { email, password } = userBodySchema.parse(req.body)

    try {
        const useCase = makeAuthenticateUseCase()

        const { user } = await useCase.execute({
            email, password
        })

        const token = await reply.jwtSign(
            {
                role: user.role
            },
            {
                sign: {
                    sub: user.id
                }
            }
        )

        const refresh = await reply.jwtSign(
             {
                role: user.role
            },
            {
                sign: {
                    sub: user.id,
                    expiresIn: '7d'
                }
            }
        )

        return reply
        .setCookie('refresh', refresh, {
            path: '/',
            secure: true,
            sameSite: true,
            httpOnly: true
        }).
        status(200).
        send({
            token
        })

    } catch (err) {
        if (err instanceof InvalidCredentials) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }
}