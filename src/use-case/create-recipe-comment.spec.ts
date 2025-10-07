import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory-db/in-memory-recipe-repository'
import { CreateCommentUseCase } from './create-recipe-comment'
import { InMemoryCommentRepository } from '@/repositories/in-memory-db/in-memory-comment-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { InvalidRating } from './errors/invalid-rating'

let recipeRepository: InMemoryRecipeRepository
let commentRepository: InMemoryCommentRepository
let sut: CreateCommentUseCase

describe('Create Recipe Comment Use Case', () => {
    beforeEach(() => {
        commentRepository = new InMemoryCommentRepository()
        recipeRepository= new InMemoryRecipeRepository()
        sut = new CreateCommentUseCase(commentRepository, recipeRepository)
    })

    it('should be able to create a recipe comment', async () => {
        const recipe = await recipeRepository.create({
            title: 'Ravioli',
            description: 'Ravioli de presunto e queijo',
            ingredients: [
                '2 xícaras de Farinha',
                '3 Ovos',
                'Sal',
                'Presunto',
                'Queijo'
            ],
             user: {
            connect: { id: 'user-01' }
            }
        })

        const { comment} = await sut.execute({
            recipeId: recipe.id,
            userId: 'user-02',
            content: 'Delicioso!',
            rating: 5,
        })

        expect(comment.id).toEqual(expect.any(String))
        expect(comment.content).toEqual('Delicioso!'),
        expect(comment.rating).toEqual(5)
    })

    it('should not be able to create a comment without a recipe', async () => {
        await expect(() => 
            sut.execute({
                recipeId: 'non',
                userId: 'user-01',
                content: 'Delicioso!',
                rating: 5
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })

    it('should not be able to create a comment with a invalid rating', async () => {
        const recipe = await recipeRepository.create({
            title: 'Ravioli',
            description: 'Ravioli de presunto e queijo',
            ingredients: [
                '2 xícaras de Farinha',
                '3 Ovos',
                'Sal',
                'Presunto',
                'Queijo'
            ],
             user: {
            connect: { id: 'user-01' }
            }
        })

        await expect(() =>
            sut.execute({
                recipeId: recipe.id,
                userId: 'user-02',
                content: 'Delicioso!',
                rating: 6
            })
        ).rejects.toBeInstanceOf(InvalidRating)
    })

    it('should be able to create a comment without rating', async () => {
        const recipe = await recipeRepository.create({
            title: 'Ravioli',
            description: 'Ravioli de presunto e queijo',
            ingredients: [
                '2 xícaras de Farinha',
                '3 Ovos',
                'Sal',
                'Presunto',
                'Queijo'
            ],
             user: {
            connect: { id: 'user-01' }
            }
        })

        const { comment } = await sut.execute({
            recipeId: recipe.id,
            userId: 'user-02',
            content: 'Muito bom mesmo!',
        })

        expect(comment.rating).toBeNull()
    })
})