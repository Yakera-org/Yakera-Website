import React from 'react';
import { Button, Form, FormGroup, Input, Alert} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import './LoginPage.css';
import classnames from 'classnames';

const LoginTemplate = ({
  handleChange,
  data,
  error,
  handleLogin,
  EN
}) => {

  return (
    <div style={{ backgroundImage: `url(https://yakera-files.s3.us-east-2.amazonaws.com/yakera/pattern-yakera-orange.png)`}}>
      <Card className='login-card'>
        <CardContent>

          <Form noValidate className='login-form' onSubmit={handleLogin}>
            <h1>
              <span className='font-weight-bold'>{EN ? 'Welcome to Yakera' : 'Bienvenido a Yakera'} </span>
            </h1>
            <h2>{EN ? 'Please Log In' : 'Iniciar Sesión'}</h2>
            <hr />

            <FormGroup>
              <Input
                type='email'
                placeholder={EN ? 'Enter your email address' : 'Correo electrónico '}
                name="email"
                value={data.email}
                onChange={handleChange}
                className={classnames(
                  'form-control',
                  { 'is-valid': data.errors.email === false},
                  { 'is-invalid': data.errors.email }
                )}
                required
              />
            </FormGroup>

            { (data.errors.email !== false && data.errors.email !== null) && (
              <Alert color="danger">
                { data.errors.email }
              </Alert>
            ) }

            <FormGroup>
              <Input
                type='password'
                placeholder={EN ? 'Enter your password' : 'Contraseña'}
                name="password"
                value={data.password}
                onChange={handleChange}
                className={classnames(
                  'form-control',
                  { 'is-valid': data.errors.password === false},
                  { 'is-invalid': data.errors.password }
                )}
                required
              />
            </FormGroup>

            {(data.errors.password !== false && data.errors.password !== null) && (
              <Alert color="danger">
                {data.errors.password}
              </Alert>
            )}
            { error.errorMessage &&
              <Alert color="danger">
                { error.errorMessage }
              </Alert>
            }

            <Button
              className='btn-lg btn-dark btn-block'
              type="submit"
              disabled={data.errors.email !== false || data.errors.password !== false || data.loading}
              value={data.loading ? 'Loading...' : 'Login'}
              onClick={handleLogin}
            >
              {EN ? 'Login' : 'Iniciar'}
            </Button>

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
  )
};

export default LoginTemplate;