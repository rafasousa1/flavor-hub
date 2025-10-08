import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryRecipeRepository } from '@/repositories/in-memory-db/in-memory-recipe-repository'
import { InMemoryCommentRepository } from '@/repositories/in-memory-db/in-memory-comment-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { FetchRecipeCommentsUseCase } from './fetch-recipe-comments'

let recipeRepository: InMemoryRecipeRepository
let commentRepository: InMemoryCommentRepository
let sut: FetchRecipeCommentsUseCase

describe('Fetch Recipe Comment Use Case', () => {
    beforeEach(() => {
        commentRepository = new InMemoryCommentRepository()
        recipeRepository= new InMemoryRecipeRepository()
        sut = new FetchRecipeCommentsUseCase(commentRepository, recipeRepository)
    })

    it('should be able to create a recipe comment', async () => {
        const recipe = await recipeRepository.create({
            title: 'Ravioli',
            description: 'Ravioli de presunto e queijo',
            ingredients: ['2 xícaras de Farinha', '3 Ovos', 'Sal', 'Presunto','Queijo'],
             user: {
            connect: { id: 'user-01' }
            }
        })

        await commentRepository.create({
            content: 'Bom demais',
            rating: 5,
            user: { connect: {id: 'user-02'}},
            recipe: {connect: {id: recipe.id}}
        })

        await commentRepository.create({
            content: 'Bom Bom Bom Bom!',
            rating: 5,
            user: { connect: {id: 'user-03'}},
            recipe: {connect: {id: recipe.id}}
        })

        const { comments } = await sut.execute({
            recipeId: recipe.id
        })

        expect(comments).toHaveLength(2)
    })

    it('should not be able to fetch comments for non recipe', async () => {
       await expect(() => 
            sut.execute({
                recipeId: 'non'
            })
        ).rejects.toBeInstanceOf(ResourceNotFound)
    })
})