import React from 'react';
import { Button, Form, FormGroup, Input, Alert} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import './ForgotPasswordPage.css';
import classnames from 'classnames';

const ForgotPasswordTemplate = ({
  handleChange,
  data,
  error,
  message,
  handleForgotPassword,
}) => {

  return (
    <div style={{ backgroundImage: `url(https://yakera-files.s3.us-east-2.amazonaws.com/yakera/pattern-yakera-blue.webp)`}}>
      <Card className='forgot-password-card'>
        <CardContent>

          <Form noValidate className='forgot-password-form' onSubmit={handleForgotPassword}>
            <h1>
              <span className='font-weight-bold'>Forgot your password?</span>
            </h1>
            <h2>We will send you a reset link</h2>
            <hr />

            <FormGroup>
              <Input
                type='email'
                placeholder='Enter your email address'
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
              Send Email
            </Button>

            <Grid container style={{marginTop:'4%', textAlign:'left'}}>
              <Grid item xs>
                <Link href="/login">
                  Remembered? Go to Login
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register">
                  Don't have an account? Sign Up
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