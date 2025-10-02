import { Recipe } from '@prisma/client'
import { RecipeRepository } from '@/repositories/recipe-repository'

interface CreateRecipeUseCaseRequest {
    userId: string
    title: string
    description: string | null
    ingredients: string[]
}

interface CreateRecipeUseCaseResponse {
    recipe: Recipe
}

export class CreateRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute({ title, description, userId, ingredients }: CreateRecipeUseCaseRequest) : Promise<CreateRecipeUseCaseResponse> {
        const recipe = await this.recipeRepository.create({
            title,
            description,
            ingredients,
            user: {
            connect: { id: userId }
            }
        })

        return { recipe }
    }
}