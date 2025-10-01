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
            created_at: new Date()
        }

        this.data.push(recipe)

        return recipe
    }
}