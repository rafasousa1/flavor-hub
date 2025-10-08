import { Prisma, Comment } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { CommentRepository } from '../comment-repository'

export class InMemoryCommentRepository implements CommentRepository {
    private data: Comment[] = []

    async create(data: Prisma.CommentCreateInput) {
        const comment = {
            id: randomUUID(),
            content: data.content,
            rating: data.rating ?? null,
            created_at: new Date(),
            user_id: data.user.connect?.id || '',
            recipe_id: data.recipe.connect?.id || ''
        }

        this.data.push(comment)

        return comment
    }

    async findByRecipeId(recipeId: string) {
        const comments = this.data.filter(comment => comment.recipe_id === recipeId)

        return comments
    }

    async delete(id: string) {
        const commentIndex = this.data.findIndex(comment => comment.id === id)

        if (commentIndex >= 0) {
            this.data.splice(commentIndex, 1)
        }
    }

    async findById(id: string) {
        const comment = this.data.find(comment => comment.id === id)

        if (!comment) {
            return null
        }

        return comment
    }
}