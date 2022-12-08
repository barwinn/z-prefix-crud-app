/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: 3, item_name: 'Grills', description: 'Good for grilling things.', quantity: 89},
    {id: 2, user_id: 5, item_name: 'Devil Dogs', description: 'Rah', quantity: 1},
    {id: 3, user_id: 1, item_name: 'Chocolate Fondue Fountains', description: 'Yum.', quantity: 8},
    {id: 4, user_id: 4, item_name: 'Nuts', description: 'Nutritious', quantity: 2},
    {id: 5, user_id: 1, item_name: 'Tables', description: 'Gotta set things down.', quantity: 43},
    {id: 6, user_id: 2, item_name: 'French Fries', description: 'I love potatoes.', quantity: 6},
    {id: 7, user_id: 3, item_name: 'Pancakes', description: 'Good for grilling things.', quantity: 89},
    {id: 8, user_id: 5, item_name: 'Fish', description: 'swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swi', quantity: 1000},
    {id: 9, user_id: 1, item_name: 'Kids', description: 'No thank you.', quantity: 8},
    {id: 10, user_id: 4, item_name: 'Pencils', description: 'Write that down write that down', quantity: 2},
    {id: 11, user_id: 1, item_name: 'Soccer Balls', description: 'Futbol', quantity: 46},
    {id: 12, user_id: 2, item_name: 'Songs', description: 'Exclusively Crazy Frog remixes.', quantity: 63},
    {id: 13, user_id: 3, item_name: 'Laptops', description: 'Where I keep my postgres', quantity: 9000},
    {id: 14, user_id: 4, item_name: 'Springs of Grass', description: 'Nice.', quantity: 17},
    {id: 15, user_id: 1, item_name: 'Mountain Lions', description: 'I think I could fight one', quantity: 33},
    {id: 16, user_id: 2, item_name: 'Rockets', description: 'Bo', quantity: 20},
    {id: 17, user_id: 2, item_name: 'Rocket Launchers', description: 'om.', quantity: 4},
    {id: 18, user_id: 6, item_name: 'Cows', description: 'Moo.', quantity: 1}
  ]);
};
