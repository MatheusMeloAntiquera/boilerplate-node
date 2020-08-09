import knex from '../../config/database';
import { UserService } from '../../app/services'
import faker from 'faker'
import { DateTime } from "luxon";
import { auth } from '~/lang/translate';

afterAll((done) => {
    knex.destroy();
    done();
});

describe('Testing UserService...', () => {
    const name = faker.name.findName(), email = faker.internet.email(), password = '123456';
    let id;
    test('Inserting a new user (insertUser) ', async (done) => {
        const user = await UserService.insertUser(name, email, password)
        expect(typeof user).toBe('object');
        expect(user).toHaveProperty('name', name);
        expect(user).toHaveProperty('email', email);
        expect(user.password).toHaveLength(128);
        expect(DateTime.fromSQL(user.created_at).isValid).toBeTruthy();
        expect(DateTime.fromSQL(user.updated_at).isValid).toBeTruthy();
        id = user.id
        done()
    });

    test('Getting user data (getUser) ', async (done) => {
        const user = await UserService.getUser(id);;
        expect(typeof user).toBe('object');
        expect(user).toHaveProperty('name', name);
        expect(user).toHaveProperty('email', email);
        expect(user.password).toHaveLength(128);
        expect(DateTime.fromSQL(user.created_at).isValid).toBeTruthy()
        expect(DateTime.fromSQL(user.updated_at).isValid).toBeTruthy()
        done();
    });

    let updateTokenAt;
    let createdTokenAt;
    let token;
    test('Testing Login method (login) ', async (done) => {
        token = await UserService.login(email, password);
        expect(typeof token).toBe('object');
        expect(token).toHaveProperty('access_token_id');
        expect(token).toHaveProperty('revoked', 0);

        updateTokenAt = token.updated_at
        createdTokenAt = token.created_at
        expect(DateTime.fromSQL(createdTokenAt).isValid).toBeTruthy();
        expect(DateTime.fromSQL(updateTokenAt).isValid).toBeTruthy();
        done();
    });

    test('Revoking a token (revokeToken)', async(done) => {
        const revokedToken = await UserService.revokeToken(token.access_token_id);
        expect(revokedToken).toHaveProperty('revoked', 1);
        expect(revokedToken.created_at).toEqual(createdTokenAt);
        expect(token.updated_at).not.toBe(revokedToken.updated_at);
        done();
    })

    test('Test a unsuccessfully login with a wrong e-mail', async (done) => {
        expect.assertions(1);
        await expect(UserService.login(faker.internet.email(), password)).rejects.toEqual(auth.emailInvalid);
        done()
    })

    test('Test a unsuccessfully login with a wrong password ', async (done) => {
        expect.assertions(1);
        await expect(UserService.login(email, 'abcde')).rejects.toEqual(auth.passwordIncorrect);
        done()
    })


})  