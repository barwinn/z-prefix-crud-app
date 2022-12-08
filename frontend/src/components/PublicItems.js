import * as React from 'react';
import ItemBox from './ItemBox';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';

function PublicItems(props) {
    const [itemData, setItemData] = React.useState([]);
    const url = `http://localhost:8080/items`;
    let currentUser = props.user;

    React.useEffect(() => {
        async function getQueryResults() {
            const response = await fetch(url);
            const data = await response.json();
            setItemData(data)
        }
        getQueryResults()
    }, url)

    return (
      <Box sx={{bgcolor: 'white', padding: 2}}>
      <h1>Public Items</h1>
      <Box sx={{display:'flex', flexWrap:'wrap', bgcolor: 'lightblue', borderRadius: 1, padding: 10}}>
        {itemData.map((currentItem) => {
            return(
                <ItemBox item={currentItem} user={false}/>
            )
        })}
      </Box>
      </Box>
    );
  }

export default PublicItems;