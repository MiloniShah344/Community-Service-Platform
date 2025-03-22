import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Navbar = ({toggleSidebar}) =>{

    const navigate = useNavigate()

    const handleLogin = () =>{
    navigate('/Login')
  }
    return(
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
              >
                Connecting Goodness
              </Typography>
              <Box sx={{ flexGrow: 1 }} />

            </Toolbar>
            <button className="logout-button" onClick={() => { handleLogin() }}>
              <FaSignOutAlt /> Login
            </button>
          </AppBar>
        </Box>
    )
    
}

export default Navbar