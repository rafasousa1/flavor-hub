import { PrismaRecipeRepository } from '@/repositories/prisma/prisma-recipe-repository'
import { DeleteRecipeUseCase } from '../delete-recipe'

export function makeDeleteRecipeUseCase() {
    const recipeRepository = new PrismaRecipeRepository()
    const deleteRecipeUseCase = new DeleteRecipeUseCase(recipeRepository)

    return deleteRecipeUseCase
}