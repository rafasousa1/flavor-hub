import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory-db/in-memory-recipe-repository'
import { SearchRecipeUseCase } from './search-recipe'

let recipeRepository: InMemoryRecipeRepository
let sut: SearchRecipeUseCase

describe('Search Recipe Use Case', () => {
    beforeEach(() => {
        recipeRepository = new InMemoryRecipeRepository()
        sut = new SearchRecipeUseCase(recipeRepository)
    })

    it('should be able to search a recipe by name', async () => {
        await recipeRepository.create({
            user: { connect: { id: 'user-01' } },
            title: 'Ravioli',
            description: 'Ravioli de presunto e queijo',
            ingredients: [
                '2 xícaras de Farinha',
                '3 Ovos',
                'Sal',
                'Presunto',
                'Queijo'
            ]
        })

        const { recipes } = await sut.execute({
            search: 'Ravioli',
            page: 1
        })

        expect(recipes).toHaveLength(1)
        expect(recipes).toEqual([
            expect.objectContaining({title: 'Ravioli'})
        ])
    })
})