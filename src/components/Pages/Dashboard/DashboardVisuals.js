import React from 'react'
import { Grid } from '@material-ui/core';
import {Card, CardContent} from '@material-ui/core';

const user = {
    name: 'Jang',
    email: 'jango@gmail.com',
    phone: '0789201008',
    socialNum: '2000271902',
    address: '99, Venezuela Road',
    campaigns:[
        {
            id:'1',
            title:'Campaign 1',
            active: true
        }
    ]
}


function DashboardVisuals() {
    return (
        <div>
            <Card className='dash-card'>
                <CardContent>
                    <div className='dash-card-top'>
                        <h1> Welcome <span id='dash-name'>{user.name}</span> </h1>
                    </div>

                    <hr />

                    <Grid container spacing={1} style={{ alignItems:'flex-start', textAlign:'left'}}>
                        <Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Email:</span> {user.email}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Phone:</span> {user.phone}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Social Number:</span> {user.socialNum}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Social Number:</span> {user.address}</p>
                            </div>
                        </Grid>
                        
                    </Grid> 

                    <hr style={{marginTop:'-10px'}}/>  

                    <div>
                       CENTER BUTTON ADD CAMPAIGN
                    </div>

                    <div className='dash-campaigns'>
                        <h2>
                            Active <span id='dash-stats'>Campaigns</span>
                        </h2>
                            
                    </div>
                    
                </CardContent>
            </Card>


        </div>
    )
}

export default DashboardVisuals
