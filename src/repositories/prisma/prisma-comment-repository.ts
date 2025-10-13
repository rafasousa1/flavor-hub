import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { CommentRepository } from '../comment-repository'

export class PrismaCommentRepository implements CommentRepository {

    async create(data: Prisma.CommentCreateInput){
        const comment = await prisma.comment.create({
            data
        })

        return comment
    }

    async findByRecipeId(recipeId: string) {
        const comments = await prisma.comment.findMany({
            where: {
                recipe_id: recipeId
            },

            orderBy: {
                created_at: 'desc'
            }
        })

        return comments
    }

    async findById(id: string) {
        const comment = await prisma.comment.findUnique({
            where: {
                id
            }
        })

        return comment
    }

    async delete(id: string) {
        await prisma.comment.delete({
            where: {
                id
            }
        })
    }
}