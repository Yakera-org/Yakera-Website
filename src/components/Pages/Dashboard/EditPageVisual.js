import React from 'react';
import { Grid, Checkbox } from '@material-ui/core';
import { Alert } from 'reactstrap';
import HashLoader from "react-spinners/HashLoader";
import classnames from 'classnames';

const EditPageVisual = ({
    profileData,
    EN,
    handleChangeAirTMEmail,
    airTMEmailError,
    onSubmitAirTM,
    handleChangeZelleCheckbox,
    handleChangeZelleEmail,
    handleChangeZelleName,
    zelleEmailError,
    zelleNameError,
    zelleCheckbox,
    onSubmitZelle,
}) => {
    var user = profileData.user;


    return (
        <div className='dashboard-container-edit'>
            <Grid container spacing={1} style={{ textAlign: 'center' }}>
                <Grid item xs={12} sm={12}>
                    <div className='banner'>
                        <h2>
                            {EN ? 'Edit Profile Details' : 'Editar detalles del perfil'}
                        </h2>
                    </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <div className='return-button'>
                        <a href="/dashboard">
                            <i className="fas fa-arrow-left"></i>
                            {EN ? ' Return' : ' Volver'}
                        </a>
                    </div>
                </Grid>
            </Grid>

            <div className='edit-area'>
                <Grid container spacing={0} style={{ alignItems:'flex-start', textAlign:'left'}}>
                    <Grid item xs={12} sm={6} >
                        <div className='dash-left'>
                            <p>
                                <span id='dash-stats'>{EN ?'Phone: ' : 'Teléfono: ' }</span>
                                <input
                                    type="text"
                                    name="phone"
                                    maxLength="20"
                                    placeholder={EN ? "Enter your number" : "Tu número telefónico" }
                                    value={user.phone}
                                    // onChange={props.handleChange}
                                    className='form-control'
                                />
                            </p>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <div className='dash-left'>
                            <p>
                                <span id='dash-stats'>{EN ?'Address: ' : 'Dirección: ' }</span>
                                <input
                                    type="text"
                                    name="location"
                                    maxLength="50"
                                    placeholder={EN ? "Enter your address" : "Tu dirección" }
                                    value={user.address}
                                    // onChange={props.handleChange}
                                    className='form-control'
                                />
                            </p>
                        </div>
                    </Grid> 
                </Grid> 

                <hr />

                <Grid container spacing={0} style={{marginTop: "30px"}}>
                    <Grid item xs={12} sm={6} id='zelle'>
                        <Grid container spacing={0} className='dash-left'>
                            <Grid item xs={12} sm={12}>
                                <p id="prompt"><span id="star">{EN ? "NEW!" : "¡Nuevo!"} </span>{EN ? "Now you can also receive donations through Zelle!" : "¡Ahora también puedes recibir donaciones por Zelle!"}<span id="star">*</span> </p>
                                <p id="description">{EN ? "To activate this payment method, you must provide the following information:" : "Para activar este método de pago es necesario que nos suministres la siguiente información:"} </p>
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <p id='dash-stats'>Zelle email:</p>
                            </Grid>
                        </Grid>
                        {/* {
                            !profileData?.user?.zelleInfo?.email
                            ?
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={8} id='zelle-email'>
                                    <input
                                        type='email'
                                        name='zelleEmail'
                                        placeholder={EN ? 'Enter your Zelle email' : 'Ingrese su correo electrónico Zelle'}
                                        onChange={handleChangeZelleEmail}
                                        className={classnames(
                                            'form-control',
                                            { 'is-valid': zelleEmailError === false },
                                            { 'is-invalid': zelleEmailError }
                                        )}
                                    />
                                    <p className='invalid-feedback'>{zelleEmailError}</p>
                                </Grid>
                            </Grid>
                            : <div className='dash-left'>
                                <p>{profileData.user.zelleInfo.email}</p>
                            </div>
                        } */}
                        <Grid container spacing={0}>
                                <Grid item xs={12} sm={8} id='zelle-email'>
                                    <input
                                        type='email'
                                        name='zelleEmail'
                                        placeholder={EN ? 'Enter your Zelle email' : 'Ingrese su correo electrónico Zelle'}
                                        value={user.zelleInfo.email}
                                        onChange={handleChangeZelleEmail}
                                        className={classnames(
                                            'form-control',
                                            { 'is-valid': zelleEmailError === false },
                                            { 'is-invalid': zelleEmailError }
                                        )}
                                    />
                                    <p className='invalid-feedback'>{zelleEmailError}</p>
                                </Grid>
                            </Grid>
                        <Grid container spacing={0} className='dash-left'>
                            <Grid item>
                                <p id='dash-stats'>{EN ? 'Zelle name:' : 'Zelle nombre:'}</p>
                            </Grid>
                        </Grid>
                        {/* {
                            !profileData?.user?.zelleInfo?.name
                            ?
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={8}>
                                    <input
                                        type='name'
                                        name='zelleName'
                                        placeholder={EN ? 'Enter your Zelle name' : 'Ingrese su correo name Zelle'}
                                        onChange={handleChangeZelleName}
                                        className={classnames(
                                            'form-control',
                                            { 'is-valid': zelleNameError === false },
                                            { 'is-invalid': zelleNameError }
                                        )}
                                    />
                                    <p className='invalid-feedback'>{zelleNameError}</p>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <button onClick={onSubmitZelle}>
                                        {EN ? "Submit" : "Enviar"}
                                    </button>
                                </Grid>
                            </Grid>
                            : <div className='dash-left'>
                                <p>{profileData.user.zelleInfo.name}</p>
                            </div>
                        } */}
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={8}>
                                <input
                                    type='name'
                                    name='zelleName'
                                    placeholder={EN ? 'Enter your Zelle name' : 'Ingrese su correo name Zelle'}
                                    value={user.zelleInfo.name}
                                    onChange={handleChangeZelleName}
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': zelleNameError === false },
                                        { 'is-invalid': zelleNameError }
                                    )}
                                />
                                <p className='invalid-feedback'>{zelleNameError}</p>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <button onClick={onSubmitZelle}>
                                    {EN ? "Submit" : "Enviar"}
                                </button>
                            </Grid>
                        </Grid>
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
                                            onChange={handleChangeZelleCheckbox}
                                            checked={zelleCheckbox}
                                            style={{
                                                color: '#ea8737',
                                                '&.MuiChecked': {
                                                    color: 'rgba(234, 135, 55, .5)'
                                                },
                                            }}
                                            />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <button onClick={onSubmitZelle}>
                                            {EN ? "Submit" : "Enviar"}
                                        </button>
                                    </Grid>
                                </Grid>
                            </>
                        
                    }
                        <Grid item xs={12} sm={12}>
                            <p className="star-des">{EN ? "*Donations made through Zelle are disintermediated by Yakera. Donations will be sent directly to your Zelle account immediately and reflected in the total balance of the campaign’s funds." : "*¡Ojo! Las donaciones realizadas a través de Zelle no son monitoreadas por Yakera. Las contribuciones llegarán directo a tu cuenta de Zelle inmediatamente y serán reflejadas en el monto de la campaña."} </p>
                        </Grid>                                        
                    </Grid>

                    <Grid item xs={12} sm={6} id='airTM'>
                        <div className='dash-left'>
                        <p id="prompt">{EN ? "Add your AirTM account to withdraw collected funds!" : "¡Añade los detalles de tu cuenta de Airtm para retirar los fondos recaudados!"}</p>
                        <p id="description">{EN ? "To transfer the funds you collect through Yakera, you must create an Airtm account and provide the email address here:" : "Para transferir tus fondos recaudados en Yakera es necesario que nos suministres tu correo de AirTM"}</p>
                            <p id='dash-stats'>AirTM email:</p>
                        </div>
                        {/* {
                            !profileData.user.airTMNum
                            ?
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={8} >
                                        <input
                                            type="email"
                                            name="airTMemail"
                                            placeholder={EN ? "Enter your AirTM email" : "Ingrese su correo electrónico AirTM"}
                                            onChange={handleChangeAirTMEmail}
                                            className={classnames(
                                                'form-control',
                                                { 'is-valid': airTMEmailError === false },
                                                { 'is-invalid': airTMEmailError }
                                            )}
                                        />
                                        <p className="invalid-feedback">{airTMEmailError}</p>
                                </Grid> 
                                <Grid item xs={12} sm={2} >
                                    <button  onClick={onSubmitAirTM}>
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
                                <p>{profileData.user.airTMNum}</p>
                            </div>
                        } */}
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={8} >
                                    <input
                                        type="email"
                                        name="airTMemail"
                                        placeholder={EN ? "Enter your AirTM email" : "Ingrese su correo electrónico AirTM"}
                                        value={user.airTMNum}
                                        onChange={handleChangeAirTMEmail}
                                        className={classnames(
                                            'form-control',
                                            { 'is-valid': airTMEmailError === false },
                                            { 'is-invalid': airTMEmailError }
                                        )}
                                    />
                                    <p className="invalid-feedback">{airTMEmailError}</p>
                            </Grid> 
                            <Grid item xs={12} sm={2} >
                                <button  onClick={onSubmitAirTM}>
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
                    </Grid>
                </Grid>
            </div>
        </div>
  )
};

export default EditPageVisual;