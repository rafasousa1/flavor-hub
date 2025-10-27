import { InvalidRating } from '@/use-case/errors/invalid-rating'
import { ResourceNotFound } from '@/use-case/errors/resource-not-found'
import { makeCreateRecipeCommentUseCase } from '@/use-case/factories/make-create-recipe-comment'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
    const createCommentBodySchema = z.object({
        content: z.string().min(1),
        rating: z.number().int().min(1).max(5).optional()
    })

    const createCommentParamsSchema = z.object({
        recipeId: z.string().uuid()
    })

    const { content, rating } = createCommentBodySchema.parse(req.body)
    const { recipeId } = createCommentParamsSchema.parse(req.params)
    
    try {
        const useCase = makeCreateRecipeCommentUseCase()

        const { comment } = await useCase.execute({
            recipeId,
            userId: req.user.sub,
            content,
            rating
        })

        return reply.status(201).send({ comment })

    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({ message: err.message })
        }

        if (err instanceof InvalidRating) {
            return reply.status(400).send({ message: err.message })
        }

        throw err
    }
}