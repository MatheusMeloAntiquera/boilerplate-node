import request from 'supertest'
import server from '../../index'
import faker from 'faker'
import { auth } from '~/lang/translate';

const name = faker.name.findName(), email = faker.internet.email(), password = faker.internet.password();

describe('User /signup Endpoint', () => {
    test('Success..', async () => {
        const res = await request(server)
            .post('/signup')
            .send({ email, name, password })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('success', true)
        expect(typeof res.body.user).toBe('object')
    })

    test('Fail (duplicate e-mail)..', async () => {
        const res = await request(server)
            .post('/signup')
            .send({ email, name, password })
        expect(res.statusCode).toEqual(422)
        expect(res.body).toHaveProperty('success', false)
    })
})

describe('User /login Endpoint', () => {
    test('Success..', async () => {
        const res = await request(server)
            .post('/login')
            .send({ email, password })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('success', true)
        expect(typeof res.body.token).toBe('object')
        expect(res.body.token).toHaveProperty('access_token_id')
        expect(res.body.token).toHaveProperty('revoked', 0);
    })

    test('Fail (wrong e-mail)..', async () => {
        const res = await request(server)
            .post('/login')
            .send({ email: faker.internet.email(), password })
        console.log(res.body)
        expect(res.statusCode).toEqual(500)
        expect(res.body).toHaveProperty('success', false)
        expect(res.body).toHaveProperty('error', auth.emailInvalid)
    })
})