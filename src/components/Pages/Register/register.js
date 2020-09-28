import React, { Component } from 'react';
import  { Card, CardContent, Button, Typography} from '@material-ui/core';
import { validateFields } from './Validation';
import classnames from 'classnames';
import { MultiStepForm, Step } from 'react-multi-form';
import './register.css';

const initialState = {
    
    step:0,
    firstName: {
        value: '',
        validateOnChange: false,
        error: ''
      },
    lastName: {
        value: '',
        validateOnChange: false,
        error: ''
      },
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
  };

class Register extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }
      /*
   * validates the field onBlur if sumbit button is not clicked
   * set the validateOnChange to true for that field
   * check for error
   */
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

  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  handleSubmit(evt) {
    evt.preventDefault();

    if(this.state.step == 0){
        this.setState({
            step: 1
        });
        return true;
    }
    // validate all fields
    const { email, password, firstName, lastName } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    const FNerror = validateFields.validateName(firstName.value);
    const LNerror = validateFields.validateName(lastName.value);
    if ([emailError, passwordError, FNerror, LNerror].every(e => e === false)) {
      // no errors submit the form
      console.log('success');

      // clear state and show all fields are validated
      this.setState({ step: this.state.step+1 });
     
    } else {
      // update the state with errors
      this.setState(state => ({
        email: {
          ...state.email,
          validateOnChange: true,
          error: emailError
        },
        firstName: {
            ...state.firstName,
            validateOnChange: true,
            error: FNerror
          },
        lastName: {
            ...state.lastName,
            validateOnChange: true,
            error: LNerror
        },
        password: {
          ...state.password,
          validateOnChange: true,
          error: passwordError
        }
      }));
    }
  }

   
    render(){
        const { firstName, lastName, email, password, allFieldsValidated } = this.state;
        return(
            <div className="register-page">     
             <Card style={{margin: '10% 30%', marginTop:'10%', paddingLeft:'5%', paddingRight:'5%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '5%'}}>Sign up with Yakera in 3 easy steps</Typography>
                    <MultiStepForm activeStep={this.state.step} accentColor='#003049'>
                        <Step label="Details">

                            {/* DETAILS */}

                            <form onSubmit={evt => this.handleSubmit(evt)}>
                            {/* Name fields */}
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                type="text"
                                name="firstName"
                                value={firstName.value}
                                placeholder="Enter your first name"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': firstName.error === false },
                                    { 'is-invalid': firstName.error }
                                )}
                                onChange={evt =>
                                    this.handleChange(validateFields.validateName, evt)
                                }
                                onBlur={evt =>
                                    this.handleBlur(validateFields.validateName, evt)
                                }
                                />
                                <div className="invalid-feedback">{firstName.error}</div>
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                type="text"
                                name="lastName"
                                value={lastName.value}
                                placeholder="Enter your last name"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': lastName.error === false },
                                    { 'is-invalid': lastName.error }
                                )}
                                onChange={evt =>
                                    this.handleChange(validateFields.validateName, evt)
                                }
                                onBlur={evt =>
                                    this.handleBlur(validateFields.validateName, evt)
                                }
                                />
                                <div className="invalid-feedback">{lastName.error}</div>
                            </div>
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
                           
                    </form>
                        </Step>
                        <Step label="Authentication">
                        <p>Authentication</p>
                        </Step>
                        <Step label="Confirmation">
                        <p>Confirmation</p>
                        </Step>
                    </MultiStepForm>
                  
                    <button
                        type="submit"
                        className="btn btn-secondary btn-block"
                        onClick={this.handleSubmit}
                        >
                        Start
                    </button>
                    <Button variant="contained" color="primary" style={{margin: '15px'}}>Register with Facebook</Button>
                    <br />
                    <Typography variant="p" >Already have an account? Log in <a id='here' href='/login'>here</a></Typography>
                    
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default Register;

class Details extends Component{
    render(){
        return(
            <div>
                Hi
            </div>
        )
    }
}
class Authentication extends Component{
    render(){
        return(
            <div>
                Hi
            </div>
        )
    }
}

class Confirmation extends Component{
    render(){
        return(
            <div>
                Hi
            </div>
        )
    }
}
