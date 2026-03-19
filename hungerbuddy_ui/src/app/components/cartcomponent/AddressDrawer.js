import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import SelectAddress from './SelectAddress';

export default function AddressDrawer({drawerStatus,setDrawerStatus}) {
  

  const toggleDrawer = (newOpen) => () => {
    setDrawerStatus(newOpen)
  };

  const DrawerList = (
    <Box sx={{ width: 400 }} role="presentation" onClick={toggleDrawer(false)}>
      <div>
           <SelectAddress/>

      </div>
        
      
    </Box>
  );

  return (
    <div>

      <Drawer anchor={'right'} open={drawerStatus} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}