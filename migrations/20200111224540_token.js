
exports.up = function (knex) {
    return knex.schema.createTable('tokens', function (table) {
        table.increments('id').primary();
        table.string('access_token_id').notNullable();
        table.boolean('revoked').defaultTo(false);
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('tokens');
};
