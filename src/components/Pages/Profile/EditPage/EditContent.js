import React from 'react';
import { Grid } from '@material-ui/core';
import RecipientOnly from './RecipientOnly';

function RecipientEdit(props) {
    const user = props.user
    const EN = props.EN
    const type = props.type

    const editFileds = type === "donor" ?
    {
        "phone": user.phone || "",
        "location": user.userInfo?.location || "",
        "age": user.userInfo?.age || "",
        "bio": user.userInfo?.bio || "",
    }
    :
    {
        "phone": user.phone || "",
        "address": user.address || ""
    }

    const fieldDict = {
        phone: EN ? "Phone Number" : "Teléfono",
        address: EN ? "Address" : "Teléfono",
        zelleEmail: "Zelle Email",
        zelleName: EN ? "Zelle Name" : "Zelle Nombre",
        reserveUsername: EN ? "Reserve Username": "Usuario de Reserve"

    }

    const fieldPlaceHolders = {
        phone: EN ? "Enter your Phone Number" : "Tu teléfono",
        address: EN ? "Enter your address" : "Tu dirección",
        zelleEmail: EN ? 'Enter your Zelle email' : 'Ingrese su correo electrónico Zelle',
        zelleName: EN ? 'Enter your Zelle name' : 'Ingrese su Zelle nombre',
        reserveUsername: EN ? "Enter your Reserve username" : "Ingrese su usuario de Reserve"

    }

    return (
        <Grid container spacing={0} className='edit-content'>
           {Object.entries(editFileds).map((field, i) => {
                    const [key, value] = field;
                    return( 
                        <Grid item xs={12} sm={6} key={i}>
                            <span id="field-span">{fieldDict[key]}</span>
                            <input
                                type="text"
                                name={key}
                                maxLength="20"
                                placeholder={fieldPlaceHolders[key]}
                                value={value}
                                className='form-control'
                            /> 
                        </Grid>
                    )                    
                })}

            {type === "recipient"
            ?
               <RecipientOnly EN={EN} user={user} fieldPlaceHolders={fieldPlaceHolders} fieldDict={fieldDict}/>
            :
            ""
        }
        </Grid>
    );
}

export default RecipientEdit;