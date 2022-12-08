import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


function Header() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
            <Button href="/" variant="contained">
              The Inventory Site
           </Button>
          </Typography>
          <Stack direction="row" spacing={2}>
          <Button href="/login" color="inherit" variant="outlined">Login</Button>
          <Button href="/newuser" color="inherit" variant="outlined">New Inventory Manager</Button>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;