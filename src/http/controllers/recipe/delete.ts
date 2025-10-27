import { ResourceNotFound } from '@/use-case/errors/resource-not-found'
import { makeDeleteRecipeUseCase } from '@/use-case/factories/make-delete-recipe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteRecipe(req: FastifyRequest, reply: FastifyReply) {
    const deleteRecipeBodySchema = z.object({
        recipeId: z.string().uuid()
    })

    const { recipeId } = deleteRecipeBodySchema.parse(req.body)
    
    try { 
    const useCase = makeDeleteRecipeUseCase()

    await useCase.execute({
        recipeId
    })
    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({ message: err.message })
        }

        throw err
    }

    return reply.status(204).send()
}