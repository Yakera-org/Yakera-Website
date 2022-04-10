import React from 'react';
import { Progress } from 'react-sweet-progress';
import { Grid } from '@material-ui/core';
import {Card, CardContent} from '@material-ui/core';
import CardRaised from './CardRaised';

const nameDictEN = {
    "education": "Education",
    "healthcare": "Healthcare",
    "small_business":"Small Business",
    "nutrition": "Nutrition"
  };
  const nameDictSP = {
    "education":"Educación",
    "healthcare":"Atención Médica",
    "nutrition":"Nutrición",
    "small_business":"Pequeños Negocios"
  };
  

function DashboardCard(props) {
    const EN = props.EN
    const campaign = props.campaign
    const language = EN ? 'en':'es'
    var hrefLink = '/campaign/' + campaign.slug;

    let title
    let mainPicture = campaign.mainPicture?.url;
    
    try {
        title = campaign.translations[language].title;
    } catch (err) {
        title = campaign.title;
    } 
    
    return (
        <Grid item xs={12} sm={6} >
            <Card className='active-cam-card'>
                <CardContent>
                    <div className='dash-active-cam'>
                        <h3>{title}</h3>

                        <hr />

                        <Grid container spacing={5} style={{ alignItems:'flex-start'}}>
                            <Grid item xs={12} sm={12} style={{textAlign:'left'}} >
                                <p><span id='dash-stats'>{EN ? "Created: " : "Creada: "}</span> {campaign.createdAt}</p>
                                <p><span id='dash-stats'>{EN ? "Category: " : "Categoría: "}</span>
                                {EN
                                    ?
                                    nameDictEN[campaign.category]
                                    :
                                    nameDictSP[campaign.category]
                                }   
                                </p>
                                <p><span id='dash-stats'>{EN ? "Description: " : "Descripción: "}</span> {campaign.description}</p>
                                <p><span id='dash-status'>{EN ? "Status: " : "Estado: "}</span> {campaign.approved ? 
                                        <span style={{color:'#71B98F'}}>{EN ? "Approved" : "Aprobada"} </span> 
                                        :    
                                        <span style={{color:'orange'}}>{EN ? "Pending approval" : "Aprobación pendiente"}  </span>
                                    }</p>

                                <Grid item xs={12} sm={12} style={{textAlign:'center'}} >
                                    <img src={mainPicture} alt='cam-title-img' />
                                </Grid>
                                <br />
                                {campaign.approved
                                    ?
                                    <>
                                    <div id='dash-progress-bar'>
                                        <Progress theme={{
                                            default: {
                                                trailColor: 'lightrey',
                                                symbol: '',
                                                color: '#ea8737'
                                            }
                                        }}
                                        status="default"
                                        percent={ Math.min((100* ((campaign.raised + campaign?.zelleRaised)/campaign.targetAmount)).toFixed(0), 100) }/>
                                    </div>
                                    <br />

                                    <CardRaised campaign={campaign} EN={EN}/>
                                    
                                    <br />
                                    <div className='action-btn'>
                                        <Grid container spacing={0}>

                                            <Grid item xs={6} sm={6}  style={{textAlign:'center'}} >  
                                                <div style ={{display: "grid", placeItems: "center"}}><button name={campaign.slug} onClick={e => props.onWithdraw(e,"partial")} id='withdraw'>
                                                    {EN ? "Withdraw funds" : "Retirar mis fondos"}
                                                </button></div>
                                                
                                            </Grid>
                                            <Grid item xs={6} sm={6} style={{textAlign:'center'}} >  
                                                <div style ={{display: "grid", placeItems: "center"}}><button name={campaign.slug} onClick={e => props.onWithdraw(e,"complete")} id='withdraw'>
                                                    {EN ? "End campaign" : "Cerrar campaña"}
                                                </button></div>
                                                
                                            </Grid>
                                        </Grid>  
                                                                          
                                    </div>
                                    <div className = "action-btn" style = {{marginTop: "15px"}}>                                   
                                        <Grid item xs={12} sm={12} style={{textAlign:'center'}} >  
                                                <button id='go' style={{width: "95%", padding: "0px", textAlign:'center'}} >
                                                    <a href={hrefLink}>{EN ? "Go to campaign" : "Ir a campaña"}</a>
                                                </button>
                                        </Grid> 
                                    </div>
                                </>
                                :
                                ''
                                }
                            </Grid>
                            
                        </Grid>                                                                    

                    </div>
                </CardContent>
            </Card>
        </Grid>
    )
}

export default DashboardCard;