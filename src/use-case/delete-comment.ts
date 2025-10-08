import { CommentRepository } from '@/repositories/comment-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorized } from './errors/not-authorized'

interface DeleteCommentUseCaseRequest {
    userId: string
    commentId: string
}


export class DeleteCommentUseCase {
    constructor(private commentRepository: CommentRepository) {}

    async execute({ userId, commentId }: DeleteCommentUseCaseRequest) {
        const comment = await this.commentRepository.findById(commentId)

        if (!comment) {
            throw new ResourceNotFound()
        }

        if (comment.user_id !== userId) {
            throw new NotAuthorized()
        }

        await this.commentRepository.delete(commentId)
    }
}