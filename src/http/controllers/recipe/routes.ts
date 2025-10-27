import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/hooks/verify-jwt'
import { deleteRecipe } from './delete'
import { search } from './search'
import { details } from './details'

export default function recipeRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.get('/recipes/search', search)
    app.get('/recipes/details', details)

    app.post('/recipes', create)
    app.delete('/recipes/:recipeId', deleteRecipe)
}