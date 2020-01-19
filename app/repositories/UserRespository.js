import Repository from './Respository.js';
import { User } from '../models/index.js';

class UserRepository extends Repository {
    constructor() {
        super(User);
    }
}

export default new UserRepository;