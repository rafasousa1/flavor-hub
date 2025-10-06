import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory-db/in-memory-recipe-repository'
import { DeleteRecipeUseCase } from './delete-recipe'

let recipeRepository: InMemoryRecipeRepository
let sut: DeleteRecipeUseCase
describe('Delete Recipe Use Case', () => {
    beforeEach(() => {
        recipeRepository = new InMemoryRecipeRepository()
        sut = new DeleteRecipeUseCase(recipeRepository)
    })

    it('should be able to delete a recipe', async () => {
        const createdRecipe = await recipeRepository.create({
            title: 'Ravioli',
            description: 'Ravioli de presunto e queijo',
            ingredients: [
                '2 xícaras de Farinha',
                '3 Ovos',
                'Sal',
                'Presunto',
                'Queijo'
            ],
             user: {
            connect: { id: 'user-01' }
            }
        })

        await sut.execute({
            recipeId: createdRecipe.id
        })

        const recipe = await recipeRepository.findById(createdRecipe.id)

        expect(recipe).toBeNull()
    })
})