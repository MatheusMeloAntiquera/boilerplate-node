import Repository from './Respository.js';
import { Token } from '../models/index.js';

class TokenRepository extends Repository {
    constructor() {
        super(Token);
    }
}

export default new TokenRepository;