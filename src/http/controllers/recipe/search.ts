import { makeSearchRecipeUseCase } from '@/use-case/factories/make-search-recipe-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function search(req: FastifyRequest, reply: FastifyReply) {
    const searchRecipeBodySchema = z.object({
        search: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { search, page } = searchRecipeBodySchema.parse(req.body)

    
    const useCase = makeSearchRecipeUseCase()

    const { recipes } = await useCase.execute({
        search,
        page
    })

    return reply.status(200).send({ recipes })
}