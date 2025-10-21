import { FastifyInstance } from 'fastify'
import { create } from './create'
import { verifyJWT } from '@/http/hooks/verify-jwt'

export default function recipeRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)
    
    app.post('/recipes', create)
}