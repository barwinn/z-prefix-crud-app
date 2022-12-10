// app.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 8080;

const env = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[env];
const knex = require('knex')(config);

const bcrypt = require("bcrypt");
const cors = require('cors');

const saltRounds = 10;
const { hash, compare } = bcrypt;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
    console.log(`The server is running on ${PORT}`);
  });


//HASHING AND SALTING
function createUser(id, first_name, last_name, username, passwordHash) {
  return knex("users")
    .insert({
      'id': id,
      'first_name': first_name,
      'last_name': last_name,
      'username': username,
      'password': passwordHash,
    })
    .then((data) => data);
}


function getPasswordHashForUser(username) {
  return knex("users")
    .where( { username } )
    .select(`password`)
    .then((data) => data[0].password);
}


app.post("/login", (req, res) => {
  // verify if a user has entered the right password for their existing account

  let username = req.body.username;
  let pass = req.body.password;
  console.log(pass);

  getPasswordHashForUser(username)
    .then((hashedPass) => {
      // check the entered pass against the hashed one using bcrypt
      console.log(`What the user entered on login:`, pass);
      console.log(`What the db has stored for that user:`, hashedPass);
      // look up the hashed password for that user
      compare(pass, hashedPass)
        // return a succeed or fail message, depending on the password being right
        .then((isMatch) => {
          if (isMatch) res.status(202).json("PASSWORDS MATCH");
          else res.status(401).json("NO MATCH FOR THE PASSWORDS");
        })
        .catch((err) => res.status(500).json(err));
    })
    .catch((err) => res.status(500).json("Unrecognized Username"));
});


/////CREATES/////
//Create new user
app.post('/users', async (req, res) => {
    console.log('User add called');
    console.log(req.body);

    console.log(hash, saltRounds);
    let maxObject = await knex('users').max('id');
    let id = maxObject[0].max + 1;

    let firstname = req.body.first_name;
    let lastname = req.body.last_name;
    let username = req.body.username;
    let pass = req.body.password;
    

    hash(pass, saltRounds)
    .then((hashedPass) => {
      // then insert the record into the DB and return a success message
      console.log(`What the password actually is:`, pass);
      console.log(`What gets stored in the DB:`, hashedPass);
      createUser(id, firstname, lastname, username, hashedPass)
        .then((data) => res.status(201).json("USER CREATED"))
        .catch((err) => res.status(500).json(err));
    })
})

  //GET USER ID
  app.post('/userID', function(req, res) {
    const current_username = req.body.username;
    console.log(current_username);
    knex
      .select('id')
      .from('users')
      .where('username', current_username)
      .then(data => res.status(200).json(data))
      
      .catch(err =>
        res.status(404).json({
          message:
            'The data you are looking for could not be found. Please try again'
        })
      );
  });

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

  //GET USER ITEMS
app.get('/items/:id', function(req, res) {
  const current_id = parseInt(req.params.id);
  knex
    .select('*')
    .from('items')
    .where('user_id', current_id)
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