import { ResourceNotFound } from '@/use-case/errors/resource-not-found'
import { makeGetRecipeDetailsUseCase } from '@/use-case/factories/make-get-recipe-details'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function details(req: FastifyRequest, reply: FastifyReply) {
    const recipeDetailsBodySchema = z.object({
        recipeId: z.string().uuid()
    })

    const { recipeId } = recipeDetailsBodySchema.parse(req.body)

    try {
        const useCase = makeGetRecipeDetailsUseCase()

         await useCase.execute({
            recipeId
        })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({ message: err.message })
        }

        throw err
    }

    return reply.status(200).send()
}