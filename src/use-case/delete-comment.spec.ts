import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteCommentUseCase } from './delete-comment'
import { InMemoryCommentRepository } from '@/repositories/in-memory-db/in-memory-comment-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { NotAuthorized } from './errors/not-authorized'

let commentRepository: InMemoryCommentRepository
let sut: DeleteCommentUseCase

describe('Delete Recipe Use Case', () => {
    beforeEach(() => {
        commentRepository = new InMemoryCommentRepository()
        sut = new DeleteCommentUseCase(commentRepository)
    })

    it('should be able to delete a comment', async () => {
        const comment = await commentRepository.create({
            content: 'Delicioso!',
            rating: 5,
            user: {connect: {id: 'user-01'}},
            recipe: {connect: {id: 'recipe-01'}}
        })

        await sut.execute({
            userId: 'user-01',
            commentId: comment.id
        })

        const deletedComment = await commentRepository.findById(comment.id)

        expect(deletedComment).toBeNull()
    })

    it('should not be able to delete a non exist comment', async () => {
        await expect(() => 
            sut.execute({
                userId: 'user-01',
                commentId: 'non'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it('should not be able to delete a comment from another user', async () => {
        const comment = await commentRepository.create({
            content: 'Delicioso!',
            rating: 5,
            user: {connect: {id: 'user-02'}},
            recipe: {connect: {id: 'recipe-02'}}
        })

        await expect(() => 
            sut.execute({
                userId: 'user-01',
                commentId: comment.id
            })
        ).rejects.toBeInstanceOf(NotAuthorized)
    })
})