import { Prisma, Comment } from '@prisma/client'

export interface CommentRepository {
    create(data: Prisma.CommentCreateInput) : Promise<Comment>
    findByRecipeId(recipeId: string) : Promise<Comment[]>
    findById(id: string): Promise<Comment | null>
    delete(id: string) : Promise<void>
}