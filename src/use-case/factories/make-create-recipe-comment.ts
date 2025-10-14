import { PrismaRecipeRepository } from '@/repositories/prisma/prisma-recipe-repository'
import { PrismaCommentRepository } from '@/repositories/prisma/prisma-comment-repository'
import { CreateCommentUseCase } from '../create-recipe-comment'


export function makeCreateRecipeCommentUseCase() {
    const recipeRepository = new PrismaRecipeRepository()
    const commentRepository = new PrismaCommentRepository()
    const createRecipeUseCase = new CreateCommentUseCase(commentRepository, recipeRepository)

    return createRecipeUseCase
}
