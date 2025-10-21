import { makeCreateRecipeUseCase } from '@/use-case/factories/make-create-recipe'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(req: FastifyRequest, reply: FastifyReply) {
    const createRecipeBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        ingredients: z.array(z.string())
    })

    const { title, description, ingredients } = createRecipeBodySchema.parse(req.body)

    
    const useCase = makeCreateRecipeUseCase()

    await useCase.execute({
        userId: req.user.sub,
        title,
        description,
        ingredients
    })

    return reply.status(201).send()
}