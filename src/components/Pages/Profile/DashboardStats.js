import React from 'react';
import { Grid, Checkbox } from '@material-ui/core';
import "./Dashoard.scss"



function DashboardStats(props) {
    const EN = props.EN
    const StatDictionary ={
        email: EN ? "Email" : "Email",
        phone: EN ? "Phone Number" : "Teléfono",
        address: EN ? "Address" : "Teléfono",
        zelleEmail: EN ? "Zelle Email" : "Email Zelle",
        acceptingZelle: EN ? "Accepting Zelle Payments?" : "¿Aceptando pago?",
        reserveUsername: EN ? "Reserve Username": "Usuario de Reserve"
    }
    const user = props.user
    const userStats = {
        email: props.user.email || "",
        phone: props.user.phone || "",
        address: props.user.address || "",
        reserveUsername: props.user.reserveUsername || "",
        zelleEmail: props.user.zelleInfo.email || "",
    }
    console.log(user)
    return (
        <div className='dashboard-stats'>
            <h2> {EN ?'Welcome ' : '¡Hola ' }  <span id='orange'>{user.firstName}</span>!</h2>

            <Grid container spacing={1} className='dashboard-stats-grid'>
                {Object.entries(userStats).map((stat, i) => {
                    const [key, value] = stat;
                    return( 
                        <Grid item xs={12} sm={4} key={i}>
                            <p>
                                <span id="orange">{StatDictionary[key]}</span>: {value ? value : <span id="grey">{EN ? "missing" : "desaparecido"} </span>}
                            </p>
                        </Grid>
                    )                    
                })} 
                {userStats.zelleEmail
                ?
                <Grid item xs={12} sm={4}>
                    <p style={{marginTop:"-10px"}}>
                        <span id="orange">{StatDictionary["acceptingZelle"]}</span>:  
                        <Checkbox
                            disabled
                            checked={user.zelleInfo.isAccepting}
                            style={{
                                color: '#ea8737',
                                '&.MuiChecked': {
                                    color: 'rgba(234, 135, 55, .5)'
                                },
                            }}
                            />
                    </p>
                </Grid>
                :
                ""
                }     
            </Grid>
            <button className='edit-button'>
                {EN ? 'Edit profile' : 'Editar perfil'}
            </button>
        </div>
    );
}

export default DashboardStats;