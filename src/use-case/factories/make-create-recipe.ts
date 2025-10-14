import { PrismaRecipeRepository } from '@/repositories/prisma/prisma-recipe-repository'
import { CreateRecipeUseCase } from '../create-recipe'


export function makeCreateRecipeUseCase() {
    const recipeRepository = new PrismaRecipeRepository()
    const createRecipeUseCase = new CreateRecipeUseCase(recipeRepository)

    return createRecipeUseCase
}
