import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory-db/in-memory-recipe-repository'
import { CreateRecipeUseCase } from './create-recipe'

let recipeRepository: InMemoryRecipeRepository
let sut: CreateRecipeUseCase

describe('Create Recipe Use Case', () => {
    beforeEach(() => {
        recipeRepository = new InMemoryRecipeRepository()
        sut = new CreateRecipeUseCase(recipeRepository)
    })

    it('should be able to create a recipe', async () => {
        const { recipe } = await sut.execute({
            userId: 'user-01',
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

        expect(recipe.id).toEqual(expect.any(String))
    })
})