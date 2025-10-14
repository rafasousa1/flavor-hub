import { PrismaCommentRepository } from '@/repositories/prisma/prisma-comment-repository'
import { DeleteCommentUseCase } from '../delete-comment'

export function makeDeleteCommentUseCase() {
    const commentRepository = new PrismaCommentRepository()
    const deleteCommentUseCase = new DeleteCommentUseCase(commentRepository)

    return deleteCommentUseCase
}