import { Prisma, Recipe } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { RecipeRepository } from '../recipe-repository'

export class InMemoryRecipeRepository implements RecipeRepository {
    private data: Recipe[] = []

    async create(data: Prisma.RecipeCreateInput) {

        const recipe = {
            id: randomUUID(),
            user_id: data.user.connect?.id || '',
            title: data.title,
            description: data.description ?? null,
            ingredients: (data.ingredients as string[]),
            created_at: new Date()
        }

        this.data.push(recipe)

        return recipe
    }

    async searchMany(search: string, page: number) {
        return this.data.filter(item => item.title.includes(search))
        .slice((page - 1) * 20, page * 20)
    }

    async findById(id: string) {
        const recipe = this.data.find(recipe => recipe.id === id)

        if (!recipe) {
            return null
        }

        return recipe
    }

    async delete(id: string) {
        const recipeIndex = this.data.findIndex(recipe => recipe.id === id)

        if (recipeIndex >= 0) {
            this.data.splice(recipeIndex, 1)
        }
    }
}