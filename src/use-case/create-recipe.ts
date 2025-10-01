import { Recipe } from '@prisma/client'
import { RecipeRepository } from '@/repositories/recipe-repository'

interface CreateRecipeUseCaseRequest {
    userId: string
    title: string
    description: string | null
}

interface CreateRecipeUseCaseResponse {
    recipe: Recipe
}

export class CreateRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute({ title, description, userId }: CreateRecipeUseCaseRequest) : Promise<CreateRecipeUseCaseResponse> {
        const recipe = await this.recipeRepository.create({
            title,
            description,
            user: {
            connect: { id: userId }
            }
        })

        return { recipe }
    }
}