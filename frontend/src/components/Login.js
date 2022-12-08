import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import AuthContext from './AuthContext'

let data = {};
let information = {};
const url = `http://localhost:8080/users`;

function Login() {
  const authObject = React.useContext(AuthContext);
  console.log(authObject);
  console.log(authObject.auth);
  authObject.setAuth("temper");
  console.log(authObject.auth);

  const [userData, setUserData] = React.useState([]);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  React.useEffect(() => {
    async function getQueryResults() {
        const response = await fetch(url);
        const data = await response.json();
        setUserData(data);
        console.log(data)
    }
    getQueryResults()
  }, [])

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
                    password: password,
                }
                for (const entry of userData) {
                  if (entry.username === data.username) {
                    if (entry.password === data.password) {
                    console.log('success');
                    window.location = '/personalitems';
                    }
                }
                }
            }
        }>Login</Button>
      </Grid>
    </Box>
  );
}

export default Login;