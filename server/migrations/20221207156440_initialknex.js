/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id').primary(); // adds an auto incrementing PK column
            table.string('first_name');
            table.string('last_name');
            table.string('username');
            table.string('password');
        })
        .createTable('items', table => {
            table.increments('id').primary(); // adds an auto incrementing PK column
            table.integer('user_id').notNullable();
            //table.foreign('user_id').references('users.id');
            table.string('item_name');
            table.string('description');
            table.integer('quantity');
          });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        // .alterTable('items', table => {
        //     table.dropForeign('user_id');
        // })
        .then(function () {
            return knex.schema.dropTableIfExists('users');
        })
        .then(function () {
            return knex.schema.dropTableIfExists('items');
        })
};
