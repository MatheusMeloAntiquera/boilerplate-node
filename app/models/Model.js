import knex from '../../config/database';

class Model {
    constructor(table) {
        this.table = table;
        this.knex = knex;
    }

    insert(data) {
        return this.knex(this.table)
            .insert(data)
            .then(id => this.findById(id));
    }

    findById(id) {
        return this.knex(this.table).where({ id  }).first();
    }

    findOne(where) {
        return this.knex(this.table).where(where).first();
    }

    update(where, data){
        return this.knex(this.table)
            .where(where)
            .update(data);
    }

}

export default Model;