import * as React from 'react';
import ItemBox from './ItemBox';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import NewItem from './NewItem';
import config from '../config'
const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;


const dataset = {
  "user_id": "3",
  "item_name": "fish",
  "description": "swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swim swi",
  "quantity": "89"
}


function PersonalItems(props) {  
    let currentUser = props.user;
    currentUser = 4;
    const [currentMode, setMode] = React.useState('view');
    const [itemData, setItemData] = React.useState([]);

    const editModeSetter = () => {
      (currentMode === 'edit')? setMode('view') : setMode('edit');
    };

    let url = ApiUrl + `/items`
    if (currentUser !== false) {
    url = ApiUrl + `/items/` + currentUser;
    }

    React.useEffect(() => {
        async function getQueryResults() {
            const response = await fetch(url);
            const data = await response.json();
            setItemData(data)
        }
        getQueryResults()
    }, [])

//(currentMode === 'edit')? setMode('view') : setMode('edit')

    return (
      <Box sx={{bgcolor: 'white', padding: 2}}>
      <h1>Personal Items</h1>
      <FormGroup>
      <FormControlLabel onChange={editModeSetter} control={<Switch />} label="Edit Mode" />
      </FormGroup>
      <Box sx={{display:'flex', flexWrap:'wrap', bgcolor: 'lightblue', borderRadius: 1, padding: 10}}>
        {itemData.map((currentItem) => {
            return(
                <ItemBox item={currentItem} user={true} mode={currentMode}/>
            )
        })}

        {((currentUser !== false) && (currentMode === 'edit')) ?

        <NewItem user={currentUser}/>

        : ''}
      </Box>
      </Box>
    );
  }

export default PersonalItems;