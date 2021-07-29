import React from 'react'
import classnames from 'classnames'

function Register_auth(props) {
    return (
        <div className='register-authentication'>

            <h2>Authentication</h2>
            <hr />

            <br /> 
            <input
                type="text"
                name="address"
                placeholder="Enter your address"
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
                placeholder="Enter your phone"
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
                placeholder="Enter your AirTM Number"
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
                placeholder="Enter your Social Security Number"
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
