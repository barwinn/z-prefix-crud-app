import * as React from 'react';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


let data = {};
let information = {};

function ItemBox(props) {
  let currentItem = props.item;
  let currentUser = parseInt(document.cookie);

  let currentMode = props.mode;
  let displayDescription = "";

  const [itemname, setItemname] = React.useState(currentItem.item_name);
  const [description, setDescription] = React.useState(currentItem.description);
  const [quantity, setQuantity] = React.useState(currentItem.quantity);


  (currentItem.description.length > 100) ? displayDescription = currentItem.description.slice(0,99) + "...": displayDescription = currentItem.description;
    return (
      <Card sx={{ width: 275, borderRadius: 1, color: 'blue'}} key={currentItem.id}>
        <CardContent >
      {((currentUser === false) || (currentMode !== 'edit')) ? 
      <>
           <Typography gutterBottom variant="h5" component="div">
           Item {currentItem.id}: {currentItem.item_name}
             </Typography>
             <Typography variant="body2" color="text.secondary">
             Description: {displayDescription}
            </Typography>
             <Typography variant="body2" color="text.secondary">
                Quantity: {currentItem.quantity}
             </Typography>
             </>
      : 
        <>
        <div>
      Item {currentItem.id}: 
      </div>
      <TextField
          required
          id="filled-basic"
          label="Item Name"
          variant="filled"
          onChange={event => setItemname(event.target.value)}
          value={itemname}
        />
        <TextField
          required
          id="filled-basic"
          label="Description"
          variant="filled"
          onChange={event => setDescription(event.target.value)}
          value={description}
        />
           <TextField
           required
          id="filled-basic"
          variant="filled"
          label="Quantity"
          type='number'
          onChange={event => setQuantity(event.target.value)}
          value={quantity}
        />
      {(currentUser !== false) ?
      <CardActions>
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
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    };
            
                fetch(ApiUrl + '/items/' + currentItem.id, information)
                    .then(window.location = '/personalitems')
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    window.location = '/personalitems';
                })
                    .catch((error) => {
                    console.error('Error:', error);
                });
            }
        }
        >Update</Button>
        <Button variant="outlined" startIcon={<DeleteIcon />}
        onClick={
          (event) => {
              event.preventDefault();
              information = {
                  method: 'DELETE',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  };
          
              fetch(ApiUrl + '/items/' + currentItem.id, information)
                  .then(window.location = '/personalitems')
                  .then(response => response.json())
                  .then(data => {
                  console.log('Success:', data);
              })
                  .catch((error) => {
                  console.error('Error:', error);
              });
          }
      }>
          Delete
        </Button>
      </CardActions>
      :''}
        </>

      }
      </CardContent>


    </Card>
    );
  }


export default ItemBox;