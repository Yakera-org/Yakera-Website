import React from 'react';
import { Tabs, Tab, AppBar, Toolbar, Typography, IconButton, Button, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { render } from 'react-dom';


const NavBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    
    const [value, setValue] = React.useState(0);

    const handleChange = (event) => {
        setValue();
    };

  
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
        <div>
            <AppBar style={{zIndex:1301, backgroundColor: 'rgb(6, 57, 87)'}} position="fixed">
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleClick}>
                    <MenuIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open}>
                   
                    <MenuItem  onClick={handleClose}>
                        <a  href="/" >Home</a>
                    </MenuItem>
                    <MenuItem   onClick={handleClose}>
                    <a  href="/donate" >Donate</a>
                    </MenuItem>
                    
                </Menu>
                    <Typography variant="h4" color="inherit">
                        Yakera
                    </Typography>
                    
                        <Tabs                                                
                            indicatorColor="primary"
                            textColor="inherit"
                            value={2}
                            style={{marginLeft:"auto"}}
                            onChange={handleChange}
                        >
                            <Tab label="Home" href="/"/>
                            <Tab label="Donate" href="/donate" />
                            
                        </Tabs>
                       
                <span style={{marginLeft: "auto", marginRight: -12}}>
                    <Button  color="inherit" href="/login">Login</Button>   
                </span>
        
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default NavBar;