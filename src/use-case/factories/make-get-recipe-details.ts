import { PrismaRecipeRepository } from '@/repositories/prisma/prisma-recipe-repository'
import { GetRecipeDetailsUseCase } from '../get-recipe-details'

export function makeGetRecipeDetailsUseCase() {
    const recipeRepository = new PrismaRecipeRepository()
    const getRecipeDetailsUseCase = new GetRecipeDetailsUseCase(recipeRepository)

    return getRecipeDetailsUseCase
}