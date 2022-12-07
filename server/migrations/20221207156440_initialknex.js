/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
         table.increments('id'); // adds an auto incrementing PK column
            table.string('First Name').notNullable();
            table.string('Last Name').notNullable();
            table.string('Username').notNullable();
            table.string('Password').notNullable();
        })
        .createTable('items', table => {
            table.increments('id'); // adds an auto incrementing PK column
            table.integer('UserID').notNullable();
            table.foreign('UserID').references('users.id');
            table.string('Item Name').notNullable();
            table.string('Description').notNullable();
            table.integer('Quantity').notNullable();
          });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema
        .alterTable('items', table => {
            table.dropForeign('UserID');
        })
        .then(function () {
            return knex.schema.dropTableIfExists('users');
        })
        .then(function () {
            return knex.schema.dropTableIfExists('items');
        })
};
