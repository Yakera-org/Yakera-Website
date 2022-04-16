import React from 'react'
import { Grid } from '@material-ui/core';
import {Card, CardContent, Checkbox} from '@material-ui/core';
import Author from '../../author';
import DashboardCard from './DashboardCard';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';
import NoticeCard from './withdrawalCampaignNotice';
import EndCard from './endCampaignNotice';


function DashboardVisuals(props) {
    const user = props.data.user;
    const campaigns = props.data.campaigns ? props.data.campaigns : [];
    const EN = props.EN;
    const noticeCardOpen = props.noticeCardOpen;
    const endCardOpen = props.endCardOpen;
    
    
    function onWithdraw(type){
        if(!user.airTMNum){
            window.alert(EN ? "Please update your Reserve account. Without an account, we don't know where you want the money to be transferred to. Thanks" : "Actualice su dirección de correo electrónico de AirTM. Sin este correo electrónico, no sabemos a dónde desea que se transfiera el dinero. Gracias" )
        }else{
            props.onWithdraw(type);
        }
    };

    const onEdit = () => {
        window.location.href = "/dashboard/edit";
    };

    return (
        <div>
            <NoticeCard EN={EN} open = {noticeCardOpen} name = {props.selectedCampaign} onClose = {props.closeNotice.bind(this)} onWithdraw = {onWithdraw}></NoticeCard>
            <EndCard EN={EN} open = {endCardOpen} name = {props.selectedCampaign} onClose = {props.closeEnd.bind(this)} onWithdraw = {onWithdraw}></EndCard>
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
                        {/* <Grid item xs={12} sm={6} id='zelle'>
                            <Grid container spacing={0} className='dash-left'>
                                <Grid item xs={12} sm={12}>
                                    <p id="prompt"><span id="star">{EN ? "NEW!" : "¡Nuevo!"} </span>{EN ? "Now you can also receive donations through Zelle!" : "¡Ahora también puedes recibir donaciones por Zelle!"}<span id="star">*</span> </p>
                                    <p id="description">{EN ? "To activate this payment method, you must provide the following information:" : "Para activar este método de pago es necesario que nos suministres la siguiente información:"} </p>
                                </Grid>
                                <Grid item xs={12} sm={12}>
                                    <p id='dash-stats'>Zelle email:</p>
                                </Grid>
                            </Grid>
                            {
                                !user?.zelleInfo?.email
                                ?
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={8} id='zelle-email'>
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
                                    Looks like you're missing out on our new feature! Edit your profile
                                </Grid>
                                : <div className='dash-left'>
                                    <p>{user.zelleInfo.email}</p>
                                </div>
                            }
                            <Grid container spacing={0} className='dash-left'>
                                <Grid item>
                                    <p id='dash-stats'>{EN ? 'Zelle name:' : 'Zelle nombre:'}</p>
                                </Grid>
                            </Grid>
                            {
                                !user?.zelleInfo?.name
                                ?
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={8}>
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
                                    <Grid item xs={12} sm={4}>
                                        <button onClick={props.onSubmitZelle}>
                                            {EN ? "Submit" : "Enviar"}
                                        </button>
                                    </Grid>
                                </Grid>
                                : <div className='dash-left'>
                                    <p>{user.zelleInfo.name}</p>
                                </div>
                            }
                        {!user.zelleInfo
                            ? <></>
                            :
                                <>
                                    <Grid container spacing={0} className='dash-left'>
                                        <Grid item>
                                            <p id='dash-stats'>{EN ? 'Accepting payment?:' : '¿Aceptando pago?:'}</p>
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={6}>
                                            <Checkbox
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
                                        <Grid item xs={12} sm={6}>
                                            <button onClick={props.onSubmitZelle}>
                                                {EN ? "Submit" : "Enviar"}
                                            </button>
                                        </Grid>
                                    </Grid>
                                </>
                            
                        }
                            <Grid item xs={12} sm={12}>
                                <p className="star-des">{EN ? "*Donations made through Zelle are disintermediated by Yakera. Donations will be sent directly to your Zelle account immediately and reflected in the total balance of the campaign’s funds." : "*¡Ojo! Las donaciones realizadas a través de Zelle no son monitoreadas por Yakera. Las contribuciones llegarán directo a tu cuenta de Zelle inmediatamente y serán reflejadas en el monto de la campaña."} </p>
                            </Grid>                                        
                        </Grid> */}

                        {/* <Grid item xs={12} sm={6} id='airTM'>
                            <div className='dash-left'>
                            <p id="prompt">{EN ? "Add your AirTM account to withdraw collected funds!" : "¡Añade los detalles de tu cuenta de Airtm para retirar los fondos recaudados!"}</p>
                            <p id="description">{EN ? "To transfer the funds you collect through Yakera, you must create an Airtm account and provide the email address here:" : "Para transferir tus fondos recaudados en Yakera es necesario que nos suministres tu correo de AirTM"}</p>
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
                                    <Grid className="help-contact" item xs={12} sm={10}>
                                        <p >{EN ? "Do you have any questions or need assistance?" : "¿Tienes alguna pregunta o necesitas apoyo?"} </p>
                                        <button onClick={() => window.location = "https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D"}>
                                            {EN ? "Contact us!" : "¡Contáctanos!"}
                                        </button>
                                    </Grid>  
                                </Grid> 
                                :
                                <div className='dash-left'>
                                    <p>{user.airTMNum}</p>
                                </div>
                            }
                        </Grid> */}

                        {(!user?.zelleInfo?.email && !user.airTMNum)
                            ?
                            <Grid item xs={12} sm={12} className='details-missing'>
                                {EN
                                ?
                                "Looks like we're missing details from you. Click the button below to edit your profile details."
                                :
                                "Parece que nos faltan algunos detalles de tu cuenta. Haz click en el botón de abajo para editar tu perfil."}
                            </Grid>
                            : (user?.zelleInfo?.email && !user.airTMNum)
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

                                    <Grid item xs={12} sm={6} id='airTM' className='details-missing'>
                                    {EN
                                    ?
                                    "Looks like we're missing details from you. Click the button below to edit your profile details."
                                    :
                                    "Parece que nos faltan algunos detalles de tu cuenta. Haz click en el botón de abajo para editar tu perfil"}
                                    </Grid>
                                </>
                                : (!user?.zelleInfo?.email && user.airTMNum)
                                    ?
                                    <>
                                        <Grid item xs={12} sm={6} id='zelle' className='details-missing'>
                                        {EN
                                            ?
                                            "Looks like we're missing details from you. Click the button below to edit your profile details."
                                            :
                                            "Parece que nos faltan algunos detalles de tu cuenta. Haz click en el botón de abajo para editar tu perfil"}
                                        </Grid>

                                        <Grid item xs={12} sm={6} id='airTM'>
                                            <div className='dash-left'>
                                                <p id='dash-stats'>{EN ? "Reserve account:" : "Usuario de Reserve"}</p>
                                            </div>
                                            <div className='dash-left'>
                                                <p>{user.airTMNum}</p>
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

                                        <Grid item xs={12} sm={6} id='airTM'>
                                            <div className='dash-left'>
                                                <p id='dash-stats'>AirTM email:</p>
                                            </div>
                                            <div className='dash-left'>
                                                <p>{user.airTMNum}</p>
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
                                                <DashboardCard
                                                key={i} 
                                                campaign={campaign} 
                                                EN={EN} 
                                                openNotice = {props.openNotice} 
                                                onWithdraw={onWithdraw}
                                                openEnd = {props.openEnd}
                                                closeEnd = {props.closeEnd}
                                                
                                                />
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
