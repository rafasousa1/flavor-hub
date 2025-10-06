import { Prisma, Recipe } from '@prisma/client'

export interface RecipeRepository {
    create(data: Prisma.RecipeCreateInput) : Promise<Recipe>
    searchMany(search: string, page: number) : Promise<Recipe[]>
    findById(id: string) : Promise<Recipe | null>
    delete(id: string) : Promise<void>
}