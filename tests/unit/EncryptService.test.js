import knex from '../../config/database';
import { EncryptService } from '../../app/services'

afterAll((done) => {
    knex.destroy();
    done();
});

describe('Testing EncryptService...', () => { 
    let firstHash;
    const password = 'password'
    test('Hashing a string', () => {
        firstHash = EncryptService.encryptString(password)
        expect(firstHash).toHaveLength(128)
    })

    test('Compare a hash against the correct string', () => {
        expect(EncryptService.compareString(password, firstHash)).toBeTruthy()
    })

    test('Compare a hash against a wrong string', () => {
        expect(EncryptService.compareString('password1234', firstHash)).toBeFalsy()
    })
});