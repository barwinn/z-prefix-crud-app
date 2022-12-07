/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: 3, item_name: 'grills', description: 'Good for grilling things.', quantity: 89},
    {id: 2, user_id: 5, item_name: 'grudges', description: 'Good for killing things.', quantity: 1},
    {id: 3, user_id: 1, item_name: 'chocolate fondue fountain', description: 'Yum.', quantity: 8},
    {id: 4, user_id: 4, item_name: 'nuts', description: 'Nutritious', quantity: 2},
    {id: 5, user_id: 1, item_name: 'tables', description: 'Gotta set things down.', quantity: 43},
    {id: 6, user_id: 2, item_name: 'french fries', description: 'I love potatoes.', quantity: 6},
    {id: 7, user_id: 3, item_name: 'grills', description: 'Good for grilling things.', quantity: 89},
    {id: 8, user_id: 5, item_name: 'grudges', description: 'Good for killing things.', quantity: 1},
    {id: 9, user_id: 1, item_name: 'chocolate fondue fountain', description: 'Yum.', quantity: 8},
    {id: 10, user_id: 4, item_name: 'nuts', description: 'Nutritious', quantity: 2},
    {id: 11, user_id: 1, item_name: 'tables', description: 'Gotta set things down.', quantity: 43},
    {id: 12, user_id: 2, item_name: 'french fries', description: 'I love potatoes.', quantity: 6},
  ]);
};
