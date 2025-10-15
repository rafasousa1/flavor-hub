import { afterAll, beforeAll, describe, it, expect } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate (e2e) ', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        app.close()
    })

    it('should be able to auth user', async () => {
        await request(app.server)
        .post('/users')
        .send({
            name: 'Ronaldo',
            email: 'ronaldo@email.com',
            password: '123456'
        })

        const response = await request(app.server)
        .post('/sessions')
        .send({
            email: 'ronaldo@email.com',
            password: '123456'
        })

        expect(response.statusCode).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
    })
})