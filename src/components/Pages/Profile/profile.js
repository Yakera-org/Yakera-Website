import React, { Component } from 'react';
import  { Card, CardContent, Typography, Grid, Paper, CardHeader, Avatar, CardMedia} from '@material-ui/core';

import './profile.css';
import User from './exampleuser.json';



class Profile extends Component{
    
    render(){
        return(
            <div className='profile-page'>
             <Card className="info-card" style={{margin:'10% 5%', width:'90%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '1%'}}>Hello {User.firstname}</Typography>
                    <hr style={{width:'80%', margin:'-1% 5%', marginTop:'2%'}}/>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            {/* left */}
                            <Paper id='paper'>Name: {User.firstname} {User.lastname}</Paper>
                            <Paper id='paper'>Email: {User.email}</Paper>
                            <Paper id='paper'>Address: {User.address}</Paper>
                            <Paper id='paper'>Phone: {User.phone}</Paper>
                            </Grid>
                        <Grid item xs={6}>
                            {/* right */}
                            <Paper id='paper'>Social Security Number: {User.socialID}</Paper>
                            <Paper id='paper'>AirTM account: {User.airTMID}</Paper>
                        </Grid>
                        
                        <Grid container spacing={3}></Grid>
                            <Grid item xs={4}>
                                <button
                                type="submit"
                                className="btn btn-secondary btn-block"
                                style={{width:'90%', backgroundColor:'#003049'}}
                                >
                                Change email
                                </button>                                   
                            </Grid>

                            <Grid item xs={4}>
                                <button
                                type="submit"
                                className="btn btn-secondary btn-block"
                                style={{width:'90%', backgroundColor:'#003049'}}
                                >
                                Change password
                                </button>                                   
                            </Grid>

                            <Grid item xs={4}>
                                <button
                                type="submit"
                                className="btn btn-secondary btn-block"
                                style={{width:'90%', backgroundColor:'#003049'}}
                                >
                                Delete account
                                </button>                                   
                            </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Card className="campaigns-card" style={{width:'90%', margin:'5%', marginTop:'-5%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '1%'}}>Your campaigns</Typography>
                    <Card style={{width:'20%', backgroundColor:'#DEE'}}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe">
                               J
                            </Avatar>
                            }
                            title="José medicine bills"
                            subheader="September 14, 2020"
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                            José needed medicine. José needed medicine. José needed medicine. José needed medicine. José needed medicine. José needed medicine. 
                            </Typography>
                        </CardContent>              
                    </Card>
                    
                    
                </CardContent>
            </Card>
            </div>       
        )
    }
}

export default Profile;
