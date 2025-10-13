import { Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import { RecipeRepository } from '../recipe-repository'

export class PrismaRecipeRepository implements RecipeRepository {

    async create(data: Prisma.RecipeCreateInput){
        const recipe = await prisma.recipe.create({
            data
        })

        return recipe
    }

    async searchMany(search: string, page: number) {
        const recipe = await prisma.recipe.findMany({
            where: {
                title: {
                    contains: search
                },
            },

            take: 20,
            skip: (page -1) * 20
        })

        return recipe
    }

    async findById(id: string) {
        const recipe = await prisma.recipe.findUnique({
            where: {
                id
            }
        })

        return recipe
    }

    async delete(id: string) {
        await prisma.recipe.delete({
            where: {
                id
            }
        })
    }
}