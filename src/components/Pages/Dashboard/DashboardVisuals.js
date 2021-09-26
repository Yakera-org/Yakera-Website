import React from 'react'
import { Grid } from '@material-ui/core';
import {Card, CardContent} from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import Author from '../../author';
import classnames from 'classnames'


function DashboardVisuals(props) {
    const user = props.data.user
    const campaigns = props.data.campaigns ? props.data.campaigns : []
    
function onWithdraw(event){
    if(!user.airTMNum){
        window.alert("Please update yur AirTM email address. Without this email, we don't know where you want the money to be transferred to. Thanks")
    }else{
        props.onWithdraw(event)
    }
}

    return (
        <div>
            <Card className='dash-card'>
                <CardContent>
                    <div className='dash-card-top'>
                        <h1> Welcome <span id='dash-name'>{user.firstName}</span> </h1>
                    </div>

                    <hr />

                    <Grid container spacing={0} style={{ alignItems:'flex-start', textAlign:'left'}}>
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
                        <Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>Address:</span> {user.address}</p>
                            </div>
                        </Grid>   
                            <Grid item xs={12} sm={3} id='airTM'>
                                <div className='dash-left'>
                                    <p id='dash-stats'>AirTM email account:</p>
                                </div>
                                {
                                    !user.airTMNum
                                    ?
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={10} >
                                                <input
                                                    type="email"
                                                    name="airTMemail"
                                                    placeholder="Enter your AirTM email"
                                                    onChange={props.handleChange}
                                                    className={classnames(
                                                        'form-control',
                                                        { 'is-valid': props.emailError === false },
                                                        { 'is-invalid': props.emailError }
                                                    )}
                                                />
                                                <p className="invalid-feedback">{props.emailError}</p>
                                        </Grid> 
                                        <Grid item xs={12} sm={2} >
                                            <button  onClick={props.onSubmitEmail}>
                                                Submit
                                            </button> 
                                        </Grid> 
                                    </Grid> 
                                    :
                                    <div className='dash-left'>
                                        <p>{user.airTMNum}</p>
                                    </div>
                                }
                               
                            </Grid> 
                    </Grid> 

                    <hr style={{marginTop:'30px'}}/>  

                    <br />

                    <div className='dash-btn'>
                       <button><a href='create-campaign' >Create new campaign</a></button>
                    </div>

                    <div className='dash-campaigns'>
                        <h2>
                            Your <span id='dash-stats'>Campaigns</span>
                            <div className='active-campaigns'>
                                <Grid container spacing={4} style={{ alignItems:'flex-start', textAlign:'center'}}>
                                    {
                                        campaigns.map((campaign,i) => {
                                            var hrefLink = '/campaign/' + campaign.slug;
                                            //preventive
                                            if(!campaign.mainPicture){
                                                campaign.mainPicture = {url:'lol'}
                                            }
                                            return (
                                                <Grid item xs={12} sm={6} key={i} >
                                                    <Card className='active-cam-card'>
                                                        <CardContent>
                                                            <div className='dash-active-cam'>
                                                                {campaign.title}

                                                                <hr />

                                                                <Grid container spacing={5} style={{ alignItems:'flex-start'}}>
                                                                    <Grid item xs={12} sm={12} style={{textAlign:'left'}} >
                                                                        <p><span id='dash-stats'>Created:</span> {campaign.created}</p>
                                                                        <p><span id='dash-stats'>Category:</span> {campaign.category}</p>
                                                                        <p><span id='dash-stats'>Description:</span> {campaign.description}</p>
                                                                        <p><span id='dash-status'>Status:</span> {campaign.approved ? 'Approved' : 'Pending approval'}</p>

                                                                        <Grid item xs={12} sm={12} style={{textAlign:'center'}} >
                                                                            <img src={campaign.mainPicture.url} alt='cam-title-img' />
                                                                        </Grid>
                                                                        <br />
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
                                                                                <Grid item xs={12} sm={6} style={{textAlign:'center'}} >  
                                                                                    <button id='go'>
                                                                                        <a href={hrefLink}>Go to campaign</a>
                                                                                    </button>
                                                                                </Grid>
                                                                                <Grid item xs={12} sm={6} style={{textAlign:'center'}} >  
                                                                                    <button name={campaign.slug} onClick={onWithdraw} id='withdraw'>
                                                                                        Withdraw campaign
                                                                                    </button>
                                                                                </Grid>
                                                                            </Grid>                                                                                
                                                                        </div>  
                                                                    </Grid>
                                                                    
                                                                </Grid>                                                                    

                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )
                                        })
                                    }

                                    <Grid item xs={12} sm={6} style={{textAlign:'center'}}>
                                        <div className='dash-plus-sign'>
                                            <a href='create-campaign'><i className="fas fa-7x fa-plus-circle"></i></a>
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
