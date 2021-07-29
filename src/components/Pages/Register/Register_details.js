import React from 'react'
import classnames from 'classnames'
import { Grid } from '@material-ui/core';

function Register_details(props) {
    return (
        <div className='register-details'>

            <h2>Details</h2>
            <hr />

            <Grid container spacing={3} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={6} >
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Enter your first name"
                            value={props.data.firstName}
                            onChange={props.handleChange}
                            className={classnames(
                                'form-control',
                                { 'is-valid': props.data.errors.firstName === false },
                                { 'is-invalid': props.data.errors.firstName }
                            )}
                        />
                        <div className="invalid-feedback">{props.data.errors.lastNamex}</div>
                    </Grid>
                    <Grid item xs={12} sm={6} >
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Enter your last name"
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
                    placeholder="Enter your email"
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

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={props.data.password}
                    onChange={props.handleChange}
                    className={classnames(
                        'form-control',
                        { 'is-valid': props.data.errors.password === false },
                        { 'is-invalid': props.data.errors.password }
                    )}
                />
                <div className="invalid-feedback">{props.data.errors.password}</div>




        </div>
    )
}

export default Register_details
