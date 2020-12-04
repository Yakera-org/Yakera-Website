import React, { Component, Fragment } from 'react';
import  { Card, CardContent, Typography, Grid, Paper, CardHeader, Avatar} from '@material-ui/core';
import User from './exampleuser.json';
import AddDialog from './addCampaign';
import CampaignCard from '../../campaignCard';
import './profile.css';


class Profile extends Component{

    constructor(props) {
        super(props);
        this.handleAdd = this.handleAdd.bind(this);
        this.state = {
            openDialog: false,
            user: {}
        }
      }   
      
  
    handleAdd(){
        this.setState({
            openDialog: !this.state.openDialog
        })
    }
    render(){
        
        return(
            <div className='profile-page'>
             <Card className="info-card" style={{margin:'10% 5%', width:'90%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '1%'}}>Hello</Typography>
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
                <Grid container spacing={5} style={{alignContent:'center', alignItems:'center'}}>

                    <Grid item xs={12} sm={4}>
                        <CampaignCard
                         author="J"
                         title="Books for local school"
                         description="children need education"
                         deadline="1 December 2020"
                         image="https://venezuelanalysis.com/files/styles/large/public/images/2011/08/escuelas_bolivarianas.jpg?itok=rpJh-B6v"
                          />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CampaignCard
                        author="J"
                        title="Medecin for José"
                        description="help me pls"
                        deadline="12 December 2020"
                        image="https://staticshare.america.gov/uploads/2020/04/GettyImages-1206996921.jpg"
                         />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <CampaignCard 
                        author="J"
                        title="Oil needed to repair bike"
                        description="I cant afford oil"
                        deadline="12 Nov 2020"
                        image="https://s4.reutersmedia.net/resources/r/?m=02&d=20200602&t=2&i=1520799557&w=780&fh=&fw=&ll=&pl=&sq=&r=LYNXMPEG511GW"
                        />
                    </Grid>                        

                    <Grid item xs={12} style={{textAlign:'center'}}>
                        <button style={{borderRadius:'50%', height:'100px', width:'100px', backgroundColor:'#003049', border:'none', color:'white', fontSize:'50px'}} onClick={this.handleAdd}>+</button>
                    </Grid>
                </Grid>
                    </CardContent>
            </Card>


            <AddDialog open={this.state.openDialog} onClose={this.handleAdd} />

            
            </div>       
        )
    }
}


export default Profile;