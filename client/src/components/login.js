import React, { Component } from 'react';
import  { Card, CardContent, Drawer, Button, TextField, Typography} from '@material-ui/core';



class login extends Component{
    render(){
        return(
            <div className="login">     
             <Card style={{margin: '30%', marginTop: '10%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '5%'}}>Log in to Yakera</Typography>
                <form  autoComplete="off">
                    <div className="input_field">
                        <TextField  id="email" label="email" variant="outlined" />
                    </div>
                    <div className="input_field">
                        <TextField type="password"  id="password" label="password" variant="outlined" />
                    </div>
                    <Button href="/" variant="contained" color="primary" style={{margin: '5%'}}>Log In</Button>
                    
                </form>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default login;