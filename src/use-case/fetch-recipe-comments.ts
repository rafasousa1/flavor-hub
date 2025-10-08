import { CommentRepository } from '@/repositories/comment-repository'
import { Comment } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { RecipeRepository } from '@/repositories/recipe-repository'

interface FetchRecipeCommentsUseCaseRequest {
    recipeId: string
}

interface FetchRecipeCommentsUseCaseResponse {
    comments: Comment[]
}

export class FetchRecipeCommentsUseCase {
    constructor(private commentRepository: CommentRepository, private recipeRepository: RecipeRepository) {}

    async execute({ recipeId }: FetchRecipeCommentsUseCaseRequest): Promise <FetchRecipeCommentsUseCaseResponse> {
        const findRecipe = await this.recipeRepository.findById(recipeId)

        if (!findRecipe) {
            throw new ResourceNotFound()
        }

        const comments = await this.commentRepository.findByRecipeId(recipeId)

        return { comments }
    }
}