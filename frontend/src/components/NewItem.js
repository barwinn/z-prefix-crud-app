import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import {Redirect} from 'react-router-dom'

let data = {};
let information = {};

function NewItem(props) {
    let currentUser = props.user;
    const [itemname, setItemname] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [quantity, setQuantity] = React.useState('');
  return (
    <Card sx={{ width: 275, borderRadius: 1, color: 'blue', textAlign: 'center', padding: 2}}>
        <Typography gutterBottom variant="h5" component="div">
        <div>
      New Item: 
      </div>
        </Typography>
        <TextField
          required
          value={itemname}
          id="outlined-required"
          label="Item Name"
          variant="filled"
          onChange={event => setItemname(event.target.value)}
        />
        <TextField
          required
          value={description}
          id="outlined-required"
          label="Description"
          variant="filled"
          onChange={event => setDescription(event.target.value)}
        />        
        <TextField
          required
          value={quantity}
          id="outlined-required"
          label="Quantity"
          type="number"
          variant="filled"
          onChange={event => setQuantity(event.target.value)}
        />        
<Button variant="contained" onClick={
            (event) => {
                event.preventDefault();
                data = {
                    user_id: currentUser,
                    item_name: itemname,
                    description: description,
                    quantity: quantity
                }
            
                information = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    };
            
                fetch('http://localhost:8080/items', information)
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    window.location = '/personalitems';
                })
                    .catch((error) => {
                    console.error('Error:', error);
                });
            }
        }>New Item</Button>
    </Card>

  );
}

export default NewItem;