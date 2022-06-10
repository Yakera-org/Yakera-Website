import React from 'react';
import { Grid, Checkbox } from '@material-ui/core';
import { Alert } from 'reactstrap';
import HashLoader from "react-spinners/HashLoader";
import classnames from 'classnames';
import quetsionmark from "../../../svg/icon-questionmark.svg";

const EditPageVisual = ({
    profileData,
    EN,
    handleChange,
    onSubmit,
    reserveNameError,
    zelleEmailError,
    zelleNameError,
    isSame,
    error,
    success,
    loading,
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
                                    onChange={handleChange}
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
                                    name="address"
                                    maxLength="50"
                                    placeholder={EN ? "Enter your address" : "Tu dirección" }
                                    value={user.address}
                                    onChange={handleChange}
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
                            <Grid item xs={12} sm={12} style={{marginTop: "20px"}}>
                                <p id='dash-stats'>Zelle email:</p>
                            </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} id='zelle-email'>
                                    <input
                                        type='email'
                                        name='email'
                                        placeholder={EN ? 'Enter your Zelle email' : 'Ingrese su correo electrónico Zelle'}
                                        value={user?.zelleInfo?.email}
                                        onChange={handleChange}
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
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12}>
                                <input
                                    type='name'
                                    name='name'
                                    placeholder={EN ? 'Enter your Zelle name' : 'Ingrese su correo name Zelle'}
                                    value={user.zelleInfo?.name}
                                    onChange={handleChange}
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': zelleNameError === false },
                                        { 'is-invalid': zelleNameError }
                                    )}
                                />
                                <p className='invalid-feedback'>{zelleNameError}</p>
                            </Grid>
                        </Grid>
                    {!user.zelleInfo
                        ? <></>
                        :
                            <>
                                <Grid container spacing={0} className='dash-left'>
                                    <Grid item>
                                        <p id='dash-stats'>{EN ? 'Accepting Zelle payment?:' : '¿Aceptando Zelle pago?:'}</p>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12}>
                                        <Checkbox
                                            name='isAccepting'
                                            onChange={handleChange}
                                            checked={user.zelleInfo?.isAccepting}
                                            style={{
                                                color: '#ea8737',
                                                '&.MuiChecked': {
                                                    color: 'rgba(234, 135, 55, .5)'
                                                },
                                            }}
                                            />
                                    </Grid>
                                </Grid>
                            </>
                        
                    }
                        <Grid item xs={12} sm={12}>
                            <p className="star-des">{EN ? "*Donations made through Zelle are disintermediated by Yakera. Donations will be sent directly to your Zelle account immediately and reflected in the total balance of the campaign’s funds." : "*¡Ojo! Las donaciones realizadas a través de Zelle no son monitoreadas por Yakera. Las contribuciones llegarán directo a tu cuenta de Zelle inmediatamente y serán reflejadas en el monto de la campaña."} </p>
                        </Grid>                                        
                    </Grid>

                    <Grid item xs={12} sm={6} id='reserve'>
                        <div className='dash-left'>
                        <p id="prompt">{EN ? "Add your Reserve account to withdraw collected funds!" : "¡Añade los detalles de tu cuenta de Reserve para retirar los fondos recaudados!"}</p>
                        <p id="description">{EN ? "To transfer the funds you collect through Yakera, you must create a Reserve account and provide the username here." : "Para transferir tus fondos recaudados en Yakera es necesario que nos suministres tu usuario de Reserve aqui."}</p>
                            <p id='dash-stats'>{EN ? "Reserve account:" : "Usuario de Reserve:"}</p>
                        </div>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} >
                                    <input
                                        type="email"
                                        name="reserveUsername"
                                        placeholder={EN ? "Enter your Reserve username" : "Ingrese su usuario de Reserve"}
                                        value={user.reserveUsername}
                                        onChange={handleChange}
                                        className={classnames(
                                            'form-control',
                                            { 'is-valid': reserveNameError === false },
                                            { 'is-invalid': reserveNameError }
                                        )}
                                    />
                                    <p className="invalid-feedback">{reserveNameError}</p>
                            </Grid>
                            <Grid className="help-contact" item xs={12} sm={10}>
                                <p >{EN ? "Do you have any questions or need assistance?" : "¿Tienes alguna pregunta o necesitas apoyo?"} </p>
                                <img width="150" src={quetsionmark} alt="questionmark-help" />
                                <button onClick={() => window.location = "https://chat.whatsapp.com/LcSFQzsohaC1hmlgdbij3D"}>
                                    {EN ? "Contact us!" : "¡Contáctanos!"}
                                </button>
                            </Grid>  
                        </Grid> 
                    </Grid>
                </Grid>
                
                <div className="sweet-loading">
                    <div className='loader-wrapper'>
                        <HashLoader
                            size={50}
                            color={"#ea8737"}
                            loading={loading}
                        />
                    </div>
                </div>
                {success
                    ?
                    <Alert color="success" id='alert' style={{width:"50%", marginLeft:"25%"}}>
                        {EN ? success : '¡Tu perfil ya está actualizado!'}
                        <br />
                        {EN ? 
                        <>Head to your <a href="/dashboard" style={{color:'darkgreen', textDecoration:'underline'}}> Dashboard</a>.</> 
                        :
                         <>Dirígete a tu <a href="/dashboard" style={{color:'darkgreen', textDecoration:'underline'}}> Panel de control</a>.</>}                                            
                    </Alert>
                    :
                    ''
                }

                <hr />

                { error
                ?
                    <Alert color="danger" style={{width:"50%", marginLeft:"25%", textAlign:'center'}}>
                        { error }
                    </Alert>
                :
                ''
                }

                
                <Grid container spacing={0} className='submit-container' style={{ textAlign: 'center' }}>
                    <Grid item xs={12} sm={12}>
                        <button onClick={onSubmit} disabled={isSame}>
                            {EN ? 'Save changes' : 'Guardar cambios'}
                        </button>
                    </Grid>
                </Grid>

                <br />

                <section>
                    <p style={{textAlign:"center"}}>
                        {EN ? 'Want to delete your account? Click' : '¿Te gustaría eliminar tu cuenta? Haz click'}
                        <a href = {`mailto:info@yakera.org?subject=Delete Yakera Donor Account&body=Hello Yakera, I would like to delete my Donor Account with email: ${user.email}`}>
                            {EN ? ' here ' : ' aquí '}
                        </a>
                        {EN ? 'to get in touch with one of the members of the team.' : 'para ponerte en contacto con un miembro de nuestro equipo.'}
                    </p>
                </section>  
            </div>
        </div>
  )
};

export default EditPageVisual;