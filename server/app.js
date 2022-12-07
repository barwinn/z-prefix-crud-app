// app.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')["development"]);

app.use(express.json());

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });

/////CREATES/////
//Create new user
app.post('/users', async (req, res) => {
    console.log('User add called');
    console.log(req.body);
    let maxObject = await knex('users').max('id');
    try{
        let insertedUser = await knex('users').insert({
            'id': maxObject[0].max + 1,
            'first_name': req.body.first_name,
            'last_name': req.body.last_name,
            'username':req.body.username,
            'password': req.body.password,
        })

        let responseString = 'New User: ' + req.body.first_name + ' ' + req.body.last_name + ' : ' + req.body.username;
        console.log('New User ID:', responseString);
        res.status(201).send(insertedUser);
    } catch (e){
        console.log('Error in adding user:', e);
    }
})

//Create new item
app.post('/items', async (req, res) => {
    console.log('Item add called');
    console.log(req.body);
    let maxObject = await knex('items').max('id');
    try{
        let insertedItem = await knex('items').insert({
            'id': maxObject[0].max + 1,
            'user_id': req.body.user_id,
            'item_name': req.body.item_name,
            'description':req.body.description,
            'quantity': req.body.quantity,
        })
        let responseString = 'New Item: ' + req.body.item_name + ' : ' + req.body.description;
        console.log('New Item ID:', responseString);
        res.status(201).send(insertedItem);
    } catch (e){
        console.log('Error in adding item:', e);
    }
})

/////RETRIEVES/////
//DEFAULT GET FROM USERS
app.get('/', function(req, res) {
    knex
      .select('*')
      .from('users')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
  });

//GET ALL USERS
app.get('/users', function(req, res) {
  knex
    .select('*')
    .from('users')
    .then(data => res.status(200).json(data))
    .catch(err =>
      res.status(404).json({
        message:
          'The data you are looking for could not be found. Please try again'
      })
    );
});

//GET ALL ITEMS
app.get('/items', function(req, res) {
    knex
      .select('*')
      .from('items')
      .then(data => res.status(200).json(data))
      .catch(err =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
  });

/////UPDATES/////
//Update Item
app.patch('/items/:id', async (req, res) => {
    console.log('Item patch has been called');
    console.log('Update Passed Through:')
    const updatedid = parseInt(req.params.id);
    console.log(req.body);
    try{
        let updatedItem = {
            'user_id': req.body.user_id,
            'item_name': req.body.item_name,
            'description':req.body.description,
            'quantity': req.body.quantity,
        }
        console.log('Item Patch Requested: Patched Item', updatedItem);
        let updatedItemKnex = await knex('items').where('id', updatedid).update(updatedItem);
        res.status(200).send('Item Updated!')
    } catch (e) {
        console.log('Error in patching item:', e);
    }
})

/////DELETES/////
//Delete from items
app.delete('/items/:id', async(req, res) => {
    console.log('Item Delete called')
    const delete_id = parseInt(req.params.id);
    try{
        let deletedItem = await knex.from('items').where('id', delete_id).del();
        console.log(deletedItem);
        res.status(200).send(`Delete request for item ${delete_id}. Item Deleted: ${deletedItem}`);
    } catch(e){
        console.log('Error in deleting item:', e);
    }
})