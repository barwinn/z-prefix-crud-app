/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
         table.increments('id'); // adds an auto incrementing PK column
            table.string('first_name').notNullable();
            table.string('last_name').notNullable();
            table.string('username').notNullable();
            table.string('password').notNullable();
        })
        .createTable('items', table => {
            table.increments('id'); // adds an auto incrementing PK column
            table.integer('user_id').notNullable();
            table.foreign('user_id').references('users.id');
            table.string('item_name').notNullable();
            table.string('description').notNullable();
            table.integer('quantity').notNullable();
          });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .alterTable('items', table => {
            table.dropForeign('user_id');
        })
        .then(function () {
            return knex.schema.dropTableIfExists('users');
        })
        .then(function () {
            return knex.schema.dropTableIfExists('items');
        })
};
