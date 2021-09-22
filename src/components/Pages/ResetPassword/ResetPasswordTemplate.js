import React from 'react';
import { Button, Form, FormGroup, Input, Alert} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import './ResetPasswordPage.css';
import classnames from 'classnames';
import background from '../../../pics/pattern-yakera-blue.png'

const ResetPasswordTemplate = ({
  handleChange,
  data,
  error,
  handleResetPassword,
}) => {

  return (
    <div style={{ backgroundImage: `url(${background})`}}>
      <Card className='forgot-password-card'>
        <CardContent>

          <Form noValidate className='forgot-password-form' onSubmit={handleResetPassword}>
            <h1>
              <span className='font-weight-bold'>Reset your password</span>
            </h1>
            <h2>Enter your new password</h2>
            <hr />

            <FormGroup>
              <Input
                type='password'
                placeholder='Enter new password'
                name="password1"
                value={data.password1}
                onChange={handleChange}
                className={classnames(
                  'form-control',
                  { 'is-valid': data.errors.password1 === false},
                  { 'is-invalid': data.errors.password1 }
                )}
                required
              />
            </FormGroup>

            {(data.errors.password1 !== false && data.errors.password1 !== null) && (
              <Alert color="danger">
                {data.errors.password1}
              </Alert>
            )}

            <FormGroup>
              <Input
                type='password'
                placeholder='Enter new password again'
                name="password2"
                value={data.password2}
                onChange={handleChange}
                className={classnames(
                  'form-control',
                  { 'is-valid': data.errors.password2 === false},
                  { 'is-invalid': data.errors.password2 }
                )}
                required
              />
            </FormGroup>

            {(data.errors.password2 !== false && data.errors.password2 !== null) && (
              <Alert color="danger">
                {data.errors.password2}
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
              disabled={data.errors.password1 !== false || data.errors.password2 !== false || data.loading}
              value={data.loading ? 'Loading...' : 'Login'}
              onClick={handleResetPassword}
            >
              Change My Password
            </Button>

          </Form>

        </CardContent>
      </Card>
    </div>
  )
};

export default ResetPasswordTemplate;