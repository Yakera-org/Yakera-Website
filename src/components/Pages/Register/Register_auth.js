import React from 'react'
import classnames from 'classnames'

function Register_auth(props) {
    const EN = props.EN
    return (
        <div className='register-authentication'>

            <h2>{EN ? 'Authentication' : 'Autenticación' }</h2>
            <hr />

            <br /> 
            <input
                type="text"
                name="address"
                placeholder={EN ? "Enter your address" : "Dirección" }
                value={props.data.address}
                onChange={props.handleChange}
                className={classnames(
                    'form-control',
                    { 'is-valid': props.data.errors.address === false },
                    { 'is-invalid': props.data.errors.address }
                )}
            />
            <div className="invalid-feedback">{props.data.errors.address}</div>

            <br /> 
            <input
                type="text"
                name="phone"
                placeholder={EN ? "Enter your phone number" : "Número telefónico" }
                value={props.data.phone}
                onChange={props.handleChange}
                className={classnames(
                    'form-control',
                    { 'is-valid': props.data.errors.phone === false },
                    { 'is-invalid': props.data.errors.phone }
                )}
            />
            <div className="invalid-feedback">{props.data.errors.phone}</div>

            <br /> 
            <input
                type="text"
                name="airTMNum"
                placeholder={EN ? "Enter your AirTM address (if available)" : "Correo electrónico de AirTM (si está disponible)" }
                value={props.data.airTMNum}
                onChange={props.handleChange}
                className={classnames(
                    'form-control',
                    { 'is-valid': props.data.errors.airTMNum === false },
                    { 'is-invalid': props.data.errors.airTMNum }
                )}
            />
            <div className="invalid-feedback">{props.data.errors.airTMNum}</div>

            <br /> 
            <input
                type="text"
                name="socialNum"
                placeholder={EN ? "Enter your ID Number" : "Número de cédula" }
                value={props.data.socialNum}
                onChange={props.handleChange}
                className={classnames(
                    'form-control',
                    { 'is-valid': props.data.errors.socialNum === false },
                    { 'is-invalid': props.data.errors.socialNum }
                )}
            />
            <div className="invalid-feedback">{props.data.errors.socialNum}</div>

            
        </div>
    )
}

export default Register_auth

//address
// phone
// social number
// AirTM number
