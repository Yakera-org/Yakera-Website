import React from 'react'
import classnames from 'classnames'
import { Grid } from '@material-ui/core';

function Register_details(props) {
    const EN = props.EN
    return (
        <div className='register-details'>

            <h2>{EN ? 'Details' : 'Detalles'}</h2>
            <hr />

            <Grid container spacing={3} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <input
                            type="text"
                            name="firstName"
                            placeholder={EN ? "Enter your first name" : 'Nombre'}
                            value={props.data.firstName}
                            onChange={props.handleChange}
                            className={classnames(
                                'form-control',
                                { 'is-valid': props.data.errors.firstName === false },
                                { 'is-invalid': props.data.errors.firstName }
                            )}
                        />
                        <div className="invalid-feedback">{props.data.errors.firstName}</div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <input
                            type="text"
                            name="lastName"
                            placeholder={EN ? "Enter your last name" : 'Apellido'}
                            value={props.data.lastName}
                            onChange={props.handleChange}
                            className={classnames(
                                'form-control',
                                { 'is-valid': props.data.errors.lastName === false },
                                { 'is-invalid': props.data.errors.lastName }
                            )}
                        />
                        <div className="invalid-feedback">{props.data.errors.lastName}</div>
                    </Grid>
                </Grid> 

                <br /> 

                <input
                    type="text"
                    name="email"
                    placeholder={EN ? "Enter your email": 'Correo electrónico'}
                    value={props.data.email}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        { 'is-valid': props.data.errors.email === false },
                        { 'is-invalid': props.data.errors.email }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.email}</div>


                <br /> 
                <form>
                    <input
                        type="password"
                        name="password"
                        autoComplete="password"
                        placeholder={EN ? "Enter your password": 'Contraseña'}
                        value={props.data.password}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.password === false },
                            { 'is-invalid': props.data.errors.password }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.password}</div>

                    <br /> 

                    <input
                        type="password"
                        name="password2"
                        autoComplete="password"
                        placeholder={EN ? "Repeat your password": 'Repite la contraseña'}
                        value={props.data.password2}
                        onChange={props.handleChange}
                        className={classnames(
                            'form-control',
                            { 'is-valid': props.data.errors.password2 === false },
                            { 'is-invalid': props.data.errors.password2 }
                        )}
                    />
                    <div className="invalid-feedback">{props.data.errors.password2}</div>
                </form>



        </div>
    )
}

export default Register_details
