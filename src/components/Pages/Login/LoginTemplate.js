import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import './LoginPage.css';
import background from '../../../pics/pattern-yakera.png'
// import Author from '../../author';

const LoginTemplate = ({
  handleChange,
  data,
  validateForm,
  handleSubmit,
}) => {
  console.log(data);
  return (
    <div style={{ backgroundImage: `url(${background})`}}>
      <Card className='login-card'>
        <CardContent>

          <Form noValidate className='login-form' onSubmit={handleSubmit}>
            <h1>
              <span className='font-weight-bold'>Welcome to Yakera</span>
            </h1>
            <h2>Log in</h2>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type='email'
                placeholder='Email address'
                name="email"
                value={data.email}
                onChange={handleChange}
                isInvalid={data.errors.email === null}
                required
              />
            </FormGroup>

            {data.errors.email && (
              <span className="form-error">{data.errors.email}</span>
            )}

            <FormGroup>
              <Label>Password</Label>
              <Input
                type='password'
                placeholder='Password'
                name="password"
                value={data.password}
                onChange={handleChange}
                isInvalid={data.errors.password === null}
                required
              />
            </FormGroup>

            {data.errors.password !== null && (
              <span className="form-error">{data.errors.password}</span>
            )}

            <Button
              className='btn-lg btn-dark btn-block'
              type="submit"
              disabled={data.errors.email !== null || data.errors.password !== null}
            >
              Login
            </Button>

            <Grid container style={{marginTop:'4%'}}>
              <Grid item xs>
                <Link href="/sign-up">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/forgot-password">
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

export default LoginTemplate;