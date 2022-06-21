import React from 'react';
import { Grid } from '@material-ui/core';
import RecipientOnly from './RecipientOnly';
import DonorOnly from './DonorOnly';

function RecipientEdit(props) {
    const user = props.user
    const EN = props.EN
    const type = props.type

    const editFileds = type === "donor" ?
    {
        "location": user.donorInfo?.location || "",
        "phone": user.phone || "",
        "age": user.donorInfo?.age || "",
    }
    :
    {
        "phone": user.phone || "",
        "address": user.address || ""
    }

    const fieldDict = {
        phone: EN ? "Phone Number" : "Teléfono",
        address: EN ? "Address" : "Teléfono",
        email: "Zelle Email",
        name: EN ? "Zelle Name" : "Zelle Nombre",
        reserveUsername: EN ? "Reserve Username": "Usuario de Reserve",
        location: EN ? "Location" : "Ubicación",
        age: EN ? "Age" : "Edad",
        bio: EN ? "Biography" : "Biografía"

    }

    const fieldPlaceHolders = {
        phone: EN ? "Enter your Phone Number" : "Tu teléfono",
        address: EN ? "Enter your address" : "Tu dirección",
        email: EN ? 'Enter your Zelle email' : 'Ingrese su correo electrónico Zelle',
        name: EN ? 'Enter your Zelle name' : 'Ingrese su Zelle nombre',
        reserveUsername: EN ? "Enter your Reserve username" : "Ingrese su usuario de Reserve",
        location: EN ? "Enter your location" : "Ingrese su ubicación",
        age: EN ? "Enter your age" : "Tu edad",
        bio: EN ? "Enter a short description about yourself" : "Una descripción personal breve"

    }

    return (
        <Grid container spacing={0} className='edit-content'>
           {Object.entries(editFileds).map((field, i) => {
                    const [key, value] = field;
                    return( 
                        <Grid item xs={12} sm={6} key={i}>
                            <span id="field-span">{fieldDict[key]}</span>
                            <input
                                type={key==="age" || key==="phone" ? "number": "text"}
                                name={key}
                                maxLength="20"
                                placeholder={fieldPlaceHolders[key]}
                                value={value}
                                className='form-control'
                                onChange={props.handleChange}
                            /> 
                        </Grid>
                    )                    
                })}

            {type === "recipient"
            ?
                <RecipientOnly EN={EN} user={user} fieldPlaceHolders={fieldPlaceHolders} fieldDict={fieldDict} handleChange={props.handleChange}/>
            :
                <DonorOnly EN={EN} user={user} fieldPlaceHolders={fieldPlaceHolders} fieldDict={fieldDict} handleChange={props.handleChange}/>
            }
            
        </Grid>
    );
}

export default RecipientEdit;