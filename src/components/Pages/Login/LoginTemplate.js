import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap'
import { Grid, Link, Card, CardContent} from '@material-ui/core';
import './LoginPage.css';
import background from '../../../pics/pattern-yakera.png'
// import Author from '../../author';


class LoginTemplate extends Component {
  render() {
    return (
      <div style={{ backgroundImage: `url(${background})`}}>
        <Card className='login-card'>
          <CardContent>

            <Form className='login-form'>
              <h1>
                <span className='font-weight-bold'>Welcome to Yakera</span>
              </h1>
              <h2>Log in</h2>
              <FormGroup>
                <Label>Email</Label>
                <Input type='email' placeholder='Email'/>
              </FormGroup>
              <FormGroup>
                <Label>Password</Label>
                <Input type='password' placeholder='Password'></Input>
              </FormGroup>

              <Button className='btn-lg btn-dark btn-block'>
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
  }
}

export default LoginTemplate;