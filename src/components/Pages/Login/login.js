import React, { Component } from 'react';
import  { Card, CardContent, Button, TextField, Typography} from '@material-ui/core';
import './login.css';
import { validateFields } from '../Register/Validation';
import classnames from 'classnames';

const initialState = {
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

class login extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(evt) {
        evt.preventDefault();

         // validate all fields
      const { email, password } = this.state;
      const emailError = validateFields.validateEmail(email.value);
      const passwordError = validateFields.validatePassword(password.value);

      if ([emailError, passwordError].every(e => e === false)) {
        // no errors submit the form
        console.log('success');

        this.setState({
          allFieldsValidated : true
        })
        window.location.href = "/";
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
          }
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
                   <div className="form-group">
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
                    <div className="form-group">
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
                    <Button onClick={this.handleSubmit} variant="contained" color="primary" style={{margin: '5%'}}>Log In</Button>
                    <br />
                    <p>Don't have an account? Sign up <a id='here' href='/register'>here</a></p>
                    
                </form>
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default login;