import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'
import { profile } from './profile'
import { verifyJWT } from '@/http/hooks/verify-jwt'

export default function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verifyJWT] }, profile)
}