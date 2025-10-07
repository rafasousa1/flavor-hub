import { Prisma, Comment } from '@prisma/client'

export interface CommentRepository {
    create(data: Prisma.CommentCreateInput) : Promise<Comment>
}