import { RecipeRepository } from '@/repositories/recipe-repository'
import { Recipe } from '@prisma/client'

interface SearchRecipeUseCaseRequest {
    search: string
    page: number
}

interface SearchRecipeUseCaseResponse {
    recipes: Recipe[]
}

export class SearchRecipeUseCase {
    constructor(private recipeRepository: RecipeRepository) {}

    async execute({ search, page }: SearchRecipeUseCaseRequest) : Promise<SearchRecipeUseCaseResponse> {
        const recipes = await this.recipeRepository.searchMany(search, page)

        return { recipes }
    }
}