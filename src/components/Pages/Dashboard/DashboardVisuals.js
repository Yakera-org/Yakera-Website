import React from 'react'
import { Grid } from '@material-ui/core';
import {Card, CardContent, Checkbox} from '@material-ui/core';
import Author from '../../author';
import DashboardCard from './DashboardCard';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';


function DashboardVisuals(props) {
    const user = props.data.user;
    const campaigns = props.data.campaigns ? props.data.campaigns : [];
    const EN = props.EN;
    
    function onWithdraw(event){
        if(!user.reserveUsername){
            window.alert(EN ? "Please update your Reserve account. Without an account, we don't know where you want the money to be transferred to. Thanks" : "Actualice su usuario de Reserve. Sin este usuario, no sabemos a dónde desea que se transfiera el dinero. Gracias" )
        }else{
            props.onWithdraw(event)
        }
    };

    const onEdit = () => {
        window.location.href = "/dashboard/edit";
    };

    return (
        <div>
            <WhatsAppButton EN = {EN}></WhatsAppButton>
            <Card className='dash-card'>
                <CardContent>
                    <div className='dash-card-top'>
                        <h1> {EN ?'Welcome ' : '¡Hola ' }  <span id='dash-name'>{user.firstName}</span>!</h1>
                        <br />
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
                        <Grid item xs={12} sm={4} >
                            <div className='dash-left'>
                                <p><span id='dash-stats'>{EN ?'Address: ' : 'Dirección: ' }</span> {user.address}</p>
                            </div>
                        </Grid> 
                    </Grid> 

                    <hr />

                    <Grid container spacing={0} style={{marginTop: "30px"}}>
                        {(!user?.zelleInfo?.email && !user.reserveUsername)
                            ?
                            <Grid item xs={12} sm={12} className='details-missing'>
                                {EN
                                ?
                                "Looks like we're missing details from you. Click the button below to edit your profile details."
                                :
                                "Parece que nos faltan algunos detalles de tu cuenta. Haz click en el botón de abajo para editar tu perfil."}
                            </Grid>
                            : (user?.zelleInfo?.email && !user.reserveUsername)
                                ?
                                <>
                                    <Grid item xs={12} sm={6} id='zelle'>
                                        <Grid container spacing={0} className='dash-left'>
                                            <Grid item xs={12} sm={12}>
                                                <p id='dash-stats'>Zelle email:</p>
                                            </Grid>
                                        </Grid>
                                        <div className='dash-left'>
                                            <p>{user.zelleInfo.email}</p>
                                        </div>
                                        <Grid container spacing={0} className='dash-left'>
                                            <Grid item>
                                                <p id='dash-stats'>{EN ? 'Zelle name:' : 'Zelle nombre:'}</p>
                                            </Grid>
                                        </Grid>
                                        <div className='dash-left'>
                                            <p>{user.zelleInfo.name}</p>
                                        </div>
                                        <Grid container spacing={0} className='dash-left'>
                                            <Grid item>
                                                <p id='dash-stats'>{EN ? 'Accepting payment?:' : '¿Aceptando pago?:'}</p>
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={6}>
                                                <Checkbox
                                                    disabled
                                                    name='acceptingPayment'
                                                    onChange={props.handleChangeZelleCheckbox}
                                                    checked={props.zelleCheckbox}
                                                    style={{
                                                        color: '#ea8737',
                                                        '&.MuiChecked': {
                                                            color: 'rgba(234, 135, 55, .5)'
                                                        },
                                                    }}
                                                    />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={6} id='reserve' className='details-missing'>
                                    {EN
                                    ?
                                    "Looks like we're missing details from you. Click the button below to edit your profile details."
                                    :
                                    "Parece que nos faltan algunos detalles de tu cuenta. Haz click en el botón de abajo para editar tu perfil"}
                                    </Grid>
                                </>
                                : (!user?.zelleInfo?.email && user.reserveUsername)
                                    ?
                                    <>
                                        <Grid item xs={12} sm={6} id='zelle' className='details-missing'>
                                        {EN
                                            ?
                                            "Looks like we're missing details from you. Click the button below to edit your profile details."
                                            :
                                            "Parece que nos faltan algunos detalles de tu cuenta. Haz click en el botón de abajo para editar tu perfil"}
                                        </Grid>

                                        <Grid item xs={12} sm={6} id='reserve'>
                                            <div className='dash-left'>
                                                <p id='dash-stats'>{EN ? "Reserve account:" : "Usuario de Reserve:"}</p>
                                            </div>
                                            <div className='dash-left'>
                                                <p>{user.reserveUsername}</p>
                                            </div>
                                        </Grid>
                                    </>
                                    :
                                    <>
                                        <Grid item xs={12} sm={6} id='zelle'>
                                            <Grid container spacing={0} className='dash-left'>
                                                <Grid item xs={12} sm={12}>
                                                    <p id='dash-stats'>Zelle email:</p>
                                                </Grid>
                                            </Grid>
                                            <div className='dash-left'>
                                                <p>{user.zelleInfo.email}</p>
                                            </div>
                                            <Grid container spacing={0} className='dash-left'>
                                                <Grid item>
                                                    <p id='dash-stats'>{EN ? 'Zelle name:' : 'Zelle nombre:'}</p>
                                                </Grid>
                                            </Grid>
                                            <div className='dash-left'>
                                                <p>{user.zelleInfo.name}</p>
                                            </div>
                                            <Grid container spacing={0} className='dash-left'>
                                                <Grid item>
                                                    <p id='dash-stats'>{EN ? 'Accepting payment?:' : '¿Aceptando pago?:'}</p>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={0}>
                                                <Grid item xs={12} sm={6}>
                                                    <Checkbox
                                                        disabled
                                                        name='acceptingPayment'
                                                        onChange={props.handleChangeZelleCheckbox}
                                                        checked={props.zelleCheckbox}
                                                        style={{
                                                            color: '#ea8737',
                                                            '&.MuiChecked': {
                                                                color: 'rgba(234, 135, 55, .5)'
                                                            },
                                                        }}
                                                        />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12} sm={6} id='reserve'>
                                            <div className='dash-left'>
                                                <p id='dash-stats'>{EN ? "Reserve account:" : "Usuario de Reserve:"}</p>
                                            </div>
                                            <div className='dash-left'>
                                                <p>{user.reserveUsername}</p>
                                            </div>
                                        </Grid>
                                    </>
                        }


                        <Grid item xs={12} sm={12} className='edit-btn' style={{ textAlign: 'center' }}>
                            <button onClick={onEdit}>
                                {EN ? 'Edit profile' : 'Editar perfil'}
                            </button>
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
                                            <a href='../create-campaign'><i className="fas fa-7x fa-plus-circle"></i></a>
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
