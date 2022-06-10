import React from 'react';
import { FormGroup, Input, Alert} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import classnames from 'classnames';
import HashLoader from "react-spinners/HashLoader";

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

                    <div className='login-form'>
                        <hr />
                        <FormGroup>
                        <Input
                            type='email'
                            placeholder={EN ? 'Enter your email address' : 'Correo electrónico '}
                            name="email"
                            value={data.email}
                            onChange={props.handleChange}
                            className={classnames(
                            'form-control'
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
                            'form-control'
                            )}
                            required
                        />
                        </FormGroup>

                        <button
                            className='login-button'
                            type="submit"
                            value={data.loading ? 'Loading...' : 'Login'}
                            onClick={props.submit}
                        >
                            {!props.loading ? 
                                EN ? 'Login' : 'Iniciar'
                                :
                                // loader
                                <div className="loader-wrapper">
                                    <HashLoader
                                        size={30}
                                        color={"#ffffff"}
                                        loading={true}
                                        />
                                </div>
                            }
                        </button>

                        {
                            props.error ?

                            <Alert className="alert" color="danger">
                                {props.error}
                            </Alert>
                            :
                            ""
                        }
                        
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

                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export default LoginVisual;