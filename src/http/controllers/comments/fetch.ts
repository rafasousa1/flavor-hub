import { InvalidRating } from '@/use-case/errors/invalid-rating'
import { ResourceNotFound } from '@/use-case/errors/resource-not-found'
import { makeCreateRecipeCommentUseCase } from '@/use-case/factories/make-create-recipe-comment'
import { makeFetchRecipeCommentUseCase } from '@/use-case/factories/make-fetch-recipe-comments'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchComments(req: FastifyRequest, reply: FastifyReply) {

    const fetchCommentsParamsSchema = z.object({
        recipeId: z.string().uuid()
    })

    const { recipeId } = fetchCommentsParamsSchema.parse(req.params)
    
    try {
        const useCase = makeFetchRecipeCommentUseCase()

        const { comments } = await useCase.execute({
            recipeId
        })

        return reply.status(200).send({ comments })

    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({ message: err.message })
        }

        throw err
    }
}