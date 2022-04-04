import React from 'react';
import { Button, Form, FormGroup, Input, Alert} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import './ForgotPasswordPage.css';
import classnames from 'classnames';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton';

const ForgotPasswordTemplate = ({
  handleChange,
  data,
  error,
  message,
  handleForgotPassword,
  EN
}) => {

  return (
    <div style={{ backgroundImage: `url(https://yakera-files.s3.us-east-2.amazonaws.com/yakera/pattern-yakera-blue.webp)`}}>
      <WhatsAppButton EN ={EN}></WhatsAppButton>
      <Card className='forgot-password-card'>
        <CardContent>

          <Form noValidate className='forgot-password-form' onSubmit={handleForgotPassword}>
            <h1>
              <span className='font-weight-bold'>{EN ? 'Forgot your password?' : '¿Olvidaste tu contraseña?'}</span>
            </h1>
            <h2>{EN ? 'We will send you a reset link' : 'Le enviaremos un enlace de restablecimiento'}</h2>
            <hr />

            <FormGroup>
              <Input
                type='email'
                placeholder={EN ? 'Enter your email address' : 'correo electrónico'}
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

            {(data.errors.email !== false && data.errors.email !== null) && (
              <Alert color="danger">
                {data.errors.email}
              </Alert>
            )}

            { error.errorMessage &&
              <Alert color="danger">
                { error.errorMessage }
              </Alert>
            }

            { message.message &&
              <Alert color="success">
                { message.message }
              </Alert>
            }

            <Button
              className='btn-lg btn-dark btn-block'
              type="submit"
              disabled={data.errors.email !== false || data.loading}
              value={data.loading ? 'Loading...' : 'Login'}
              onClick={handleForgotPassword}
            >
              {EN ? 'Send Email' : 'Enviar correo electrónico'}
            </Button>

            <Grid container style={{marginTop:'4%', textAlign:'left'}}>
              <Grid item xs>
                <Link href="/login">
                  {EN ? 'Remembered? Go to Login' : '¿Recordado? Ir a Iniciar sesión'}
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register">
                  {EN ? "Don't have an account? Sign Up" : '¿No tienes una cuenta? Inscribirse'}
                </Link>
              </Grid>
            </Grid>

          </Form>

        </CardContent>
      </Card>
    </div>
  )
};

export default ForgotPasswordTemplate;