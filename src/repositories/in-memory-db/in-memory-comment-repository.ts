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
}