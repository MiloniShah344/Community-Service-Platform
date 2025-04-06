import React, {useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './ContNavbar.css'

import AlertDialog from '../Main Page/Dialog'

const ContNavbar = ({toggleSidebar}) =>{

    // const [open, setOpen] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const navigate = useNavigate()

    const handleDialogClose = (confirm) => {
      setIsDialogOpen(false);
      if (confirm) {
        console.log("Logout confirmed");
        navigate('/Login')
      }
    };

    

    const handleLogout = () =>{
      setIsDialogOpen(true)
  }
    return(
      <>
        <Box sx={{ flexGrow: 1 }} class="boxbar">
          <AppBar position="static" class="appbar">
            <Toolbar class='toolbar' style={{ display: 'flex' }}>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                class="menu-icon"
                onClick={toggleSidebar}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h4"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                class='app-name'
                onClick = {()=>{navigate('/NGODashboard')}}
              >
                Connecting Goodness
              </Typography>
              <Box sx={{ flexGrow: 1 }} />

            </Toolbar>
            <button className="logout-button" onClick={() => { handleLogout() }}>
              <FaSignOutAlt /> Logout
            </button>
          </AppBar>
        </Box>

      <AlertDialog open={isDialogOpen} onClose={handleDialogClose} />

      </>
    )
    
}

export default ContNavbar