import React from 'react'
import { Grid } from '@material-ui/core';
import {Card, CardContent} from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import Author from '../../author';

const user = {
    name: 'Jang',
    email: 'jango@gmail.com',
    phone: '0789201008',
    socialNum: '2000271902',
    address: '99, Venezuela Road',
    campaigns:[
        {
            name: "larys",
            category:"business",
            campaignName:"Jubilarse no es el final",
            target:205,
            amount:100,
            title: "Retirement is Not the End",
            description: "Help me earn an income in my food small business after I was unjustly forced to retire from my education job.",
            date: "03/13/21",
            image: require('../../../pics/campaigns/larys/title.jpeg'),
        },
        {
            name: "larys",
            category:"business",
            campaignName:"Jubilarse no es el final",
            target:805,
            amount:270,
            title: "Retirement is Not the End",
            description: "Help me earn an income in my food small business after I was unjustly forced to retire from my education job.",
            date: "03/13/21",
            image: require('../../../pics/campaigns/ailin/title.jpeg'),
        },
        {
            name: "larys",
            category:"business",
            campaignName:"Jubilarse no es el final",
            target:205,
            amount:100,
            title: "Retirement is Not the End",
            description: "Help me earn an income in my food small business after I was unjustly forced to retire from my education job.",
            date: "03/13/21",
            image: require('../../../pics/campaigns/maria/title.jpeg'),
        },
    ]
}


function DashboardVisuals(props) {
    console.log(props.data)
    const user = props.data.user
    const campaigns = props.data.campaigns
    return (
        <div>
            <Card className='dash-card'>
                <CardContent>
                    <div className='dash-card-top'>
                        <h1> Welcome <span id='dash-name'>{user.firstName}</span> </h1>
                    </div>

                    <hr />

                    <Grid container spacing={1} style={{ alignItems:'flex-start', textAlign:'left'}}>
                        <Grid item xs={12} sm={4} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Email:</span> {user.email}</p>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={4} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Phone:</span> {user.phone}</p>
                            </div>
                        </Grid>
                        {/*<Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>ID Number:</span> {user.socialNum}</p>
                            </div>
                        </Grid> */}
                        <Grid item xs={12} sm={4} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Adress:</span> {user.address}</p>
                            </div>
                        </Grid>                        
                    </Grid> 

                    <hr style={{marginTop:'-10px'}}/>  

                    <br />

                    <div className='dash-btn'>
                       <button><a href='create-campaign' >Create new campaign</a></button>
                    </div>

                    <div className='dash-campaigns'>
                        <h2>
                            Active <span id='dash-stats'>Campaigns</span>
                            <div className='active-campaigns'>
                                <Grid container spacing={4} style={{ alignItems:'flex-start', textAlign:'center'}}>
                                    {
                                        campaigns.map((campaign,i) => {
                                            var hrefLink = '/campaign/' + campaign.slug;
                                            return (
                                                <Grid item xs={12} sm={6} key={i} >
                                                    <Card className='active-cam-card'>
                                                        <CardContent>
                                                            <div className='dash-active-cam'>
                                                                {campaign.title}

                                                                <hr />

                                                                <Grid container spacing={5} style={{ alignItems:'flex-start'}}>
                                                                    <Grid item xs={12} sm={6} style={{textAlign:'left'}} >
                                                                        <p><span id='dash-stats'>Created:</span> {campaign.createdAt}</p>
                                                                        <p><span id='dash-stats'>Category:</span> {campaign.category}</p>
                                                                        <p><span id='dash-stats'>Description:</span> {campaign.description}</p>

                                                                        <div id='dash-progress-bar'>
                                                                            <Progress theme={{
                                                                                default: {
                                                                                    trailColor: 'lightrey',
                                                                                    symbol: '',
                                                                                    color: '#ea8737'
                                                                                }
                                                                            }}
                                                                            status="default"
                                                                            percent={ Math.min((100* (campaign.raised/campaign.targetAmount)).toFixed(0), 100) }/>
                                                                        </div>
                                                                        <br />
                                                                        <p id='dash-raised'>Raised: <span id='dash-stats'>{campaign.raised}$</span></p>
                                                                        <br />
                                                                        <div className='action-btn'>
                                                                            <Grid container spacing={2} style={{ alignItems:'flex-start'}}>
                                                                                <Grid item xs={12} sm={6} style={{textAlign:'left'}} >  
                                                                                    <button id='go'>
                                                                                        <a href={hrefLink}>Go to campaign</a>
                                                                                    </button>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6} style={{textAlign:'left'}} >  
                                                                                    <button id='withdraw'>
                                                                                        Withdraw campaign
                                                                                    </button>
                                                                                </Grid>
                                                                            </Grid>                                                                                
                                                                        </div>  

                                                                    </Grid>
                                                                    <Grid item xs={12} sm={6} >
                                                                        <img src={campaign.mainPicture.url} alt='cam-title-img' />
                                                                    </Grid>
                                                                </Grid>                                                                    

                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )
                                        })
                                    }

                                    <Grid item xs={12} sm={6} >
                                        <div className='dash-plus-sign'>
                                            <a href='create-campaign'><i className="fas fa-9x fa-plus-circle"></i></a>
                                        </div>
                                    </Grid>

                                </Grid> 
                            </div>
                        </h2>

                    </div>
                    
                </CardContent>
            </Card>

            <Author />
        </div>
    )
}

export default DashboardVisuals
