import { NotAuthorized } from '@/use-case/errors/not-authorized'
import { ResourceNotFound } from '@/use-case/errors/resource-not-found'
import { makeDeleteCommentUseCase } from '@/use-case/factories/make-delete-comment-use-case'
import { makeDeleteRecipeUseCase } from '@/use-case/factories/make-delete-recipe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function deleteComment(req: FastifyRequest, reply: FastifyReply) {
    const deleteCommentBodySchema = z.object({
        commentId: z.string().uuid()
    })

    const { commentId } = deleteCommentBodySchema.parse(req.body)
    
    try { 
    const useCase = makeDeleteCommentUseCase()

    await useCase.execute({
        commentId,
        userId: req.user.sub
    })

    } catch (err) {
        if (err instanceof ResourceNotFound) {
            return reply.status(404).send({ message: err.message })
        }

        if (err instanceof NotAuthorized) {
            return reply.status(403).send({ message: err.message })
        }

        throw err
    }

    return reply.status(204).send()
}