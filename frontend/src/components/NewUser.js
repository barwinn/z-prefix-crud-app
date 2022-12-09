import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

let data = {};
let information = {};

function NewUser() {
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');

  return (
    <Box sx={{bgcolor: 'white', padding: 2}}>
        <h1>New User</h1>
        <Grid container spacing={1}>
        <TextField
          required
          id="firstname"
          label="Firstname"
          value={firstname}
          onChange={event => setFirstname(event.target.value)}
        />
        <TextField
          required
          onChange={event => setLastname(event.target.value)}
          id="lastname"
          label="Lastname"
          value={lastname}
        />        
        <TextField
          required
          onChange={event => setUsername(event.target.value)}
          id="username"
          label="Username"
          value={username}
        />        
        <TextField
        required
        onChange={event => setPassword(event.target.value)}
          id="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
        />
        <Button variant="contained"
        onClick={
            (event) => {
                event.preventDefault();
                data = {
                    first_name: firstname,
                    last_name: lastname,
                    username: username,
                    password: password
                }
            
                information = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                    };
            
                fetch(ApiUrl + '/users', information)
                    .then(response => response.json())
                    .then(data => {
                    console.log('Success:', data);
                    window.location = '/';
                })
                    .catch((error) => {
                    console.error('Error:', error);
                });
            }
        }
        >Submit</Button>
      </Grid>
    </Box>
  );
}

export default NewUser;