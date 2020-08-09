import knex from '../../config/database';
import { DateTime } from "luxon";

class Model {
    constructor(table) {
        this.table = table;
        this.knex = knex;
    }

    insert(data) {
        return this.knex(this.table)
            .insert(data)
            .then(id => this.findById(id[0]));
    }

    findById(id) {
        return this.knex(this.table).where({ id  }).first();
    }

    findOne(where) {
        return this.knex(this.table).where(where).first();
    }

    update(where, data){
        /* data.updated_at = DateTime.local().toFormat('yyyy-LL-dd TT:S') */
        data.updated_at = DateTime.local().toString()
        return this.knex(this.table)
            .where(where)
            .update(data)
            .then(_ => this.findOne(where));;
    }

}

export default Model;