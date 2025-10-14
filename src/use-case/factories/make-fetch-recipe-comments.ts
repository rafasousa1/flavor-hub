import { PrismaCommentRepository } from '@/repositories/prisma/prisma-comment-repository'
import { FetchRecipeCommentsUseCase } from '../fetch-recipe-comments'
import { PrismaRecipeRepository } from '@/repositories/prisma/prisma-recipe-repository'


export function makeFetchRecipeCommentUseCase() {
    const comemntRepository = new PrismaCommentRepository()
    const recipeRepository = new PrismaRecipeRepository()
    const fetchRecipeCommentUseCase = new FetchRecipeCommentsUseCase(comemntRepository, recipeRepository)

    return fetchRecipeCommentUseCase
}