import { RecipeRepository } from '@/repositories/recipe-repository'
import { ResourceNotFound } from './errors/resource-not-found'

interface DeleteRecipeUseCaseRequest {
    recipeId: string
}

export class DeleteRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute({ recipeId }: DeleteRecipeUseCaseRequest) {
        const recipe = this.recipeRepository.findById(recipeId)

        if (!recipe) {
            throw new ResourceNotFound()
        }

        await this.recipeRepository.delete(recipeId)
    }
}