import { FastifyInstance } from 'fastify'
import { authenticate } from './authenticate'
import { register } from './register'

export default function userRoutes(app: FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)
}