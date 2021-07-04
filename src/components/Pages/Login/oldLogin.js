import React, { Component } from 'react';
import  { Card, CardContent, Button, Typography} from '@material-ui/core';
import './oldLogin.css';
import { validateFields } from '../Register/Validation';
import classnames from 'classnames';

const _axios = require('axios');
const axios = _axios.create();
const qs = require('querystring')

const yakeraBackUrl = 'https://yakera-back-dev.eu-west-3.elasticbeanstalk.com';

const initialState = {
    errorMessage:"",
    email: {
        value: '',
        validateOnChange: false,
        error: ''
      },
      password: {
        value: '',
        validateOnChange: false,
        error: ''
      },
      submitCalled: false,
      allFieldsValidated: false
}

class oldLogin extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }$

    handleSubmit(evt) {
        evt.preventDefault();
         // validate all fields
      const { email, password } = this.state;
      const emailError = validateFields.validateEmail(email.value);
      const passwordError = validateFields.validatePassword(password.value);

      const requestBody = {
        email: this.state.email.value,
        password: this.state.password.value
      }
      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      const url = yakeraBackUrl + "/api/auth/signin";

      if ([emailError, passwordError].every(e => e === false)) {
        // no errors submit the form
        
        this.setState({
          allFieldsValidated : true
        })

        axios.post(url, qs.stringify(requestBody), config)
        .then(res => {
              console.log(res.data);
                
                //window.location.href = "/";
        })
        .catch(err => {
          console.log(err.message);
            this.setState({
              errorMessage: "Invalid credentials"
            })
      })
    } else {
      // update the state with errors
      this.setState(state => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError
        }
      }));
    }
  }

    handleBlur(validationFunc, evt) {
        const field = evt.target.name;
        // validate onBlur only when validateOnChange for that field is false
        // because if validateOnChange is already true there is no need to validate onBlur
        if (
          this.state[field]['validateOnChange'] === false &&
          this.state.submitCalled === false
        ) {
          this.setState(state => ({
            [field]: {
              ...state[field],
              validateOnChange: true,
              error: validationFunc(state[field].value)
            }
          }));
        }
        return;
      }
    
      /*
       * update the value in state for that field
       * check for error if validateOnChange is true
       */
      handleChange(validationFunc, evt) {
        const field = evt.target.name;
        const fieldVal = evt.target.value;
        this.setState(state => ({
          [field]: {
            ...state[field],
            value: fieldVal,
            error: state[field]['validateOnChange'] ? validationFunc(fieldVal) : ''
          },
          errorMessage:""
        }));
      }

    render(){
        const { email, password } = this.state;
        return(
            <div className="login-page">     
             <Card style={{margin: '0% 30%', marginTop:'10%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '5%'}}>Log in to Yakera</Typography>
                <form  autoComplete="off">
                   {/* Email fields */}
                   <div >
                                <label>Email</label>
                                <input
                                type="email"
                                name="email"
                                value={email.value}
                                placeholder="Enter your email"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': email.error === false },
                                    { 'is-invalid': email.error }
                                )}
                                onChange={evt =>
                                    this.handleChange(validateFields.validateEmail, evt)
                                }
                                onBlur={evt =>
                                    this.handleBlur(validateFields.validateEmail, evt)
                                }
                                />
                                <div className="invalid-feedback">{email.error}</div>
                            </div>
                    {/* Password field */}
                    <div >
                                <label>Password</label>
                                <input
                                type="password"
                                name="password"
                                value={password.value}
                                placeholder="Enter your password"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': password.error === false },
                                    { 'is-invalid': password.error }
                                )}
                                onChange={evt =>
                                    this.handleChange(validateFields.validatePassword, evt)
                                }
                                onBlur={evt =>
                                    this.handleBlur(validateFields.validatePassword, evt)
                                }
                                />
                                <div className="invalid-feedback">{password.error}</div>
                            </div>
                    <p style={{color:"red"}}>{this.state.errorMessage}</p>
                    <Button onClick={this.handleSubmit} variant="contained" color="primary">Log In</Button>                    
                    <p>Don't have an account? Sign up <a id='here' href='/register'>here</a></p>
                    
                </form>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default oldLogin;