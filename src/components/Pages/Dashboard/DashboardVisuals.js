import React from 'react'
import { Grid } from '@material-ui/core';
import {Card, CardContent} from '@material-ui/core';
import Author from '../../author';
import classnames from 'classnames'
import DashboardCard from './DashboardCard';


function DashboardVisuals(props) {
    const user = props.data.user
    const campaigns = props.data.campaigns ? props.data.campaigns : []
    const EN = props.EN
    
function onWithdraw(event){
    if(!user.airTMNum){
        window.alert(EN ? "Please update yur AirTM email address. Without this email, we don't know where you want the money to be transferred to. Thanks" : "Actualice su dirección de correo electrónico de AirTM. Sin este correo electrónico, no sabemos a dónde desea que se transfiera el dinero. Gracias" )
    }else{
        props.onWithdraw(event)
    }
}

    return (
        <div>
            <Card className='dash-card'>
                <CardContent>
                    <div className='dash-card-top'>
                        <h1> {EN ?'Welcome ' : 'Bienvenido ' }  <span id='dash-name'>{user.firstName}</span> </h1>
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
                                <p><span id='dash-stats'>{EN ?'Phone: ' : 'Teléfono: ' }</span> {user.phone}</p>
                            </div>
                        </Grid>
                        {/*<Grid item xs={12} sm={3} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>ID Number:</span> {user.socialNum}</p>
                            </div>
                        </Grid> */}
                        <Grid item xs={12} sm={4} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>{EN ?'Address: ' : 'Dirección: ' }</span> {user.address}</p>
                            </div>
                        </Grid>   
                        <Grid item xs={12} sm={4} id='airTM'>
                            <div className='dash-left'>
                                <p id='dash-stats'>AirTM email:</p>
                            </div>
                            {
                                !user.airTMNum
                                ?
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={8} >
                                            <input
                                                type="email"
                                                name="airTMemail"
                                                placeholder={EN ? "Enter your AirTM email" : "Ingrese su correo electrónico AirTM"}
                                                onChange={props.handleChange}
                                                className={classnames(
                                                    'form-control',
                                                    { 'is-valid': props.airTMEmailError === false },
                                                    { 'is-invalid': props.airTMEmailError }
                                                )}
                                            />
                                            <p className="invalid-feedback">{props.airTMEmailError}</p>
                                    </Grid> 
                                    <Grid item xs={12} sm={2} >
                                        <button  onClick={props.onSubmitEmail}>
                                            {EN ? "Submit" : "Enviar"}
                                        </button> 
                                    </Grid> 
                                </Grid> 
                                :
                                <div className='dash-left'>
                                    <p>{user.airTMNum}</p>
                                </div>
                            }
                        </Grid>
                        <Grid item xs={1} sm={8}>
                            {/* intentionally left blank */}
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {
                                !user.zelle
                                ? <>
                                    <div>
                                        <p>Zelle email:</p>
                                    </div>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12}>
                                            <input
                                                type='email'
                                                name='zelleEmail'
                                                placeholder={EN ? 'Enter your Zelle email' : 'Ingrese su correo electrónico Zelle'}
                                                onChange={props.handleChangeZelleEmail}
                                                className={classnames(
                                                    'form-control',
                                                    { 'is-valid': props.zelleEmailError === false },
                                                    { 'is-invalid': props.zelleEmailError }
                                                )}
                                            />
                                            <p className='invalid-feedback'>{props.zelleEmailError}</p>
                                        </Grid>
                                    </Grid>
                                    
                                </>
                                : <div>
                                    Something for now
                                </div>
                            }
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {
                                !user.zelle
                                ? <>
                                    <div>
                                        <p>Zelle name:</p>
                                    </div>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12}>
                                            <input
                                                type='name'
                                                name='zelleName'
                                                placeholder={EN ? 'Enter your Zelle name' : 'Ingrese su correo name Zelle'}
                                                onChange={props.handleChangeZelleName}
                                                className={classnames(
                                                    'form-control',
                                                    { 'is-valid': props.zelleNameError === false },
                                                    { 'is-invalid': props.zelleNameError }
                                                )}
                                            />
                                            <p className='invalid-feedback'>{props.zelleNameError}</p>
                                        </Grid>
                                    </Grid>
                                </>
                                : 'something'
                            }
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            {
                                !user.zelle
                                ? <>
                                    <div>
                                        {/* intentionally left blank */}
                                    </div>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12}>
                                            <button onClick={props.onSubmitZelle}>
                                                {EN ? "Submit" : "Enviar"}
                                            </button>
                                        </Grid>
                                    </Grid>
                                </>
                                : 'something'
                            }
                        </Grid>
                    </Grid> 

                    <hr style={{marginTop:'30px'}}/>  

                    <br />

                    <div className='dash-btn'>
                       <button onClick={() => window.location = '/create-campaign'}>{EN ? "Create new campaign" : "Crear nueva campaña"}</button>
                    </div>

                    <div className='dash-campaigns'>
                        <h2>
                            {EN ? "Your " : "Tus "}<span id='dash-stats'>{EN ? "Campaigns" : "Campañas"}</span>
                            <div className='active-campaigns'>
                                <Grid container spacing={4} style={{ alignItems:'flex-start', textAlign:'center'}}>
                                    {
                                        campaigns.map((campaign,i) => {                                           
                                            return(
                                                <DashboardCard key={i} campaign={campaign} EN={EN} onWithdraw={onWithdraw}/>
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
