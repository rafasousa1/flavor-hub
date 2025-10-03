import { RecipeRepository } from '@/repositories/recipe-repository'
import { Recipe } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'

interface GetRecipeDetailsRequest {
    recipeId: string
}

interface GetRecipeDetailsResponse {
    recipe: Recipe
}

export class GetRecipeDetailsUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute({ recipeId }: GetRecipeDetailsRequest) : Promise<GetRecipeDetailsResponse> {
        const recipe = await this.recipeRepository.findById(recipeId)

        if (!recipe) {
            throw new ResourceNotFound()
        }

        return { recipe }
    }
}