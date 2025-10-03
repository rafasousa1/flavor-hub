import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory-db/in-memory-recipe-repository'
import { GetRecipeDetailsUseCase } from './get-recipe-details'
import { ResourceNotFound } from './errors/resource-not-found'

let recipeRepository: InMemoryRecipeRepository
let sut: GetRecipeDetailsUseCase

describe('Get Recipe Details Use Case', () => {
    beforeEach(() => {
        recipeRepository = new InMemoryRecipeRepository()
        sut = new GetRecipeDetailsUseCase(recipeRepository)
    })

    it('should be able to get recipe details', async () => {
        const createdRecipe = await recipeRepository.create({
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

        const { recipe } = await sut.execute({
            recipeId: createdRecipe.id
        })

        expect(recipe.id).toEqual(expect.any(String))
        expect(recipe.title).toEqual('Ravioli')
    })

    it('should not be able to get a recipe with wrong id', async () => {
        await expect(() =>
            sut.execute({
                recipeId: 'non-exist'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })
})