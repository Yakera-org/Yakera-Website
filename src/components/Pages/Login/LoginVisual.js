import React from 'react';
import { Form, FormGroup, Input, Alert} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import classnames from 'classnames';

function LoginVisual(props) {
    const EN = props.EN
    const data = props.data

    return (
        <div className='login-page'>
            <Card className='login-card'>
                <CardContent>
                        <h2>
                            {EN ? 'Welcome to Yakera' : 'Bienvenido a Yakera'} 
                        </h2>
                        <h4>
                            {EN ? 'Please Log In' : 'Iniciar Sesión'}
                        </h4>
                        

                    <Form noValidate className='login-form' onSubmit={()=>console.log("submit")}>
                        <hr />
                        <FormGroup>
                        <Input
                            type='email'
                            placeholder={EN ? 'Enter your email address' : 'Correo electrónico '}
                            name="email"
                            value={data.email}
                            onChange={props.handleChange}
                            className={classnames(
                            'form-control',
                            { 'is-valid': data.errors.email === false},
                            { 'is-invalid': data.errors.email }
                            )}
                            required
                        />
                        </FormGroup>

                        <FormGroup>
                        <Input
                            type='password'
                            placeholder={EN ? 'Enter your password' : 'Contraseña'}
                            name="password"
                            value={data.password}
                            onChange={props.handleChange}
                            className={classnames(
                            'form-control',
                            { 'is-valid': data.errors.password === false},
                            { 'is-invalid': data.errors.password }
                            )}
                            required
                        />
                        </FormGroup>
                        
                        <button
                            className='login-button'
                            type="submit"
                            value={data.loading ? 'Loading...' : 'Login'}
                            onClick={()=>console.log("login")}
                        >
                            {EN ? 'Login' : 'Iniciar'}
                        </button>

                        <Grid container style={{marginTop:'4%', textAlign:'left'}}>
                        <Grid item xs>
                            <Link href="/forgot-password">
                            {EN ? 'Forgot password?' : '¿Olvidó su contraseña?'}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/register">
                            {EN ? 'Don\'t have an account? Sign Up' : '¿No tienes una cuenta? Regístrate'}
                            </Link>
                        </Grid>
                        </Grid>

                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginVisual;