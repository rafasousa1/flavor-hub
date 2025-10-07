import { CommentRepository } from '@/repositories/comment-repository'
import { RecipeRepository } from '@/repositories/recipe-repository'
import { Comment } from '@prisma/client'
import { ResourceNotFound } from './errors/resource-not-found'
import { InvalidRating } from './errors/invalid-rating'

interface CreateRecipeCommentUseCaseRequest {
    recipeId: string
    userId: string
    content: string
    rating?: number
}

interface CreateRecipeCommentUseCaseResponse {
    comment: Comment
}

export class CreateCommentUseCase {
    constructor(private commentRepository: CommentRepository, 
    private recipeRepository: RecipeRepository) {}
    
    async execute({ recipeId, userId, content, rating }: CreateRecipeCommentUseCaseRequest): Promise<CreateRecipeCommentUseCaseResponse> {
        const recipe = await this.recipeRepository.findById(recipeId)

        if (!recipe) {
            throw new ResourceNotFound()
        }

        if (rating !== undefined && (rating < 1 || rating > 5)) {
            throw new InvalidRating()
        }

        const comment = await this.commentRepository.create({
            content,
            rating: rating ?? null,
            user: {
                connect: { id: userId }
            },
            recipe: {
                connect: { id: recipeId }
            }
        })

        return { comment }
    }
}