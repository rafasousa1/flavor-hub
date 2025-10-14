import { PrismaRecipeRepository } from '@/repositories/prisma/prisma-recipe-repository'
import { SearchRecipeUseCase } from '../search-recipe'

export function makeSearchRecipeUseCase() {
    const recipeRepository = new PrismaRecipeRepository()
    const searchRecipeUseCase = new SearchRecipeUseCase(recipeRepository)

    return searchRecipeUseCase
}