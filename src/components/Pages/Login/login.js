import React, { Component } from 'react';
import  { Card, CardContent, Button, TextField, Typography} from '@material-ui/core';
import './login.css';


class login extends Component{
    render(){
        return(
            <div className="login-page">     
             <Card style={{margin: '0% 30%', marginTop:'10%'}}>
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
                    <br />
                    <Typography variant="p">Don't have an account? Sign up <a id='here' href='/register'>here</a></Typography>
                    
                </form>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default login;