import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AuthContext from './AuthContext'
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


let data = {};
let information = {};
const url = ApiUrl + `/login`;

function Login() {
  //const authObject = React.useContext(AuthContext);
  //console.log(authObject);
  //console.log(authObject.auth);
  //authObject.setAuth("temper");
  //console.log(authObject.auth);

  const [userData, setUserData] = React.useState([]);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <Box sx={{bgcolor: 'white', padding: 2}}>
        <h1>Login</h1>
        <Grid container spacing={1}>     
        <TextField
          required
          id="outlined-required"
          label="Username"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />        
        <TextField
            required
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={event => setPassword(event.target.value)}
        /> 
        <Button variant="contained" onClick={
            (event) => {
              event.preventDefault();
              data = {
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
          
              fetch(ApiUrl + '/login', information)
                  .then(response => response.json())
                  .then(data => {
                  console.log(data);
                  if (data === 'PASSWORDS MATCH') {

                    data = {
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
              
                  fetch(ApiUrl + '/userID', information)
                      .then(response => response.json())
                      .then(data => {
                      console.log(data);
                      console.log(data[0].id);
                      console.log("success?");
                      document.cookie = data[0].id + "; path=/";
                      window.location = '/personalitems';
                      })
                  }
              })
                  .catch((error) => {
                  console.error('Error:', error);
              });
          }
        }>Login</Button>
      </Grid>
    </Box>
  );
}

export default Login;