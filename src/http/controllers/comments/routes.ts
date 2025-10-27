import { FastifyInstance } from 'fastify'
import { verifyJWT } from '@/http/hooks/verify-jwt'
import { create} from './create'
import { deleteComment } from './delete'
import { fetchComments } from './fetch'

export default function commentsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJWT)

    app.post('/recipes/:recipeId/comments', create)

    app.get('/recipes/:recipeId/comments', fetchComments)

    app.delete('/comments/:commentId', deleteComment)
}