import React, { Component } from 'react';
import  { Card, CardContent, Button, Typography} from '@material-ui/core';
import { validateFields } from './Validation';
import classnames from 'classnames';
import { MultiStepForm, Step } from 'react-multi-form';
import './oldRegister.css';

const _axios = require('axios');
const axios = _axios.create();
const qs = require('querystring')

const yakeraBackUrl = 'https://yakera-back-dev.eu-west-3.elasticbeanstalk.com';

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
    address: {
      value: '',
      validateOnChange: false,
      error: ''
    },
    phone: {
      value: '',
      validateOnChange: false,
      error: ''
    },
    socialNum: {
      value: '',
      validateOnChange: false,
      error: ''
    },
    AirTMNum: {
      value: '',
      validateOnChange: false,
      error: ''
    },
    checkboxes:{
      a: false,
      b: false,
      c: false,
      d: false,
      e: false,
    },
    submitCalled: false,
    errorMessage: ''
  };
  
 
class oldRegister extends Component{
    constructor(props) {
        super(props);
        this.state = initialState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
    }


    handleCheck(evt){      
      switch(evt.target.name){
        case 'a':
          this.setState({
            checkboxes:{
              errorMessage: '',
              a: !this.state.checkboxes.a,
              b: this.state.checkboxes.b,
              c: this.state.checkboxes.c,
              d: this.state.checkboxes.d,
              e: this.state.checkboxes.e,
            }
          });
          break;
        case 'b':
          this.setState({
            checkboxes:{
              errorMessage: '',
              a: this.state.checkboxes.a,
              b: !this.state.checkboxes.b,
              c: this.state.checkboxes.c,
              d: this.state.checkboxes.d,
              e: this.state.checkboxes.e,
            }
          });
          break;
        case 'c':
          this.setState({
            checkboxes:{
              errorMessage: '',
              a: this.state.checkboxes.a,
              b: this.state.checkboxes.b,
              c: !this.state.checkboxes.c,
              d: this.state.checkboxes.d,
              e: this.state.checkboxes.e,
            }
          });
          break;
        case 'd':
          this.setState({
            checkboxes:{
              errorMessage: '',
              a: this.state.checkboxes.a,
              b: this.state.checkboxes.b,
              c: this.state.checkboxes.c,
              d: !this.state.checkboxes.d,
              e: this.state.checkboxes.e,
            }
          });
        break;
        case 'e':
          this.setState({
            checkboxes:{
              errorMessage: '',
              a: this.state.checkboxes.a,
              b: this.state.checkboxes.b,
              c: this.state.checkboxes.c,
              d: this.state.checkboxes.d,
              e: !this.state.checkboxes.e,
            }
          });
          break;
        default:
          break;
      }
     
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
  async checkemail(){
    //checks if the email is already in use
    const requestBody = {
      email: this.state.email.value
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const url = yakeraBackUrl + "/api/auth/doesEmailExist";

    const response = axios.post(url, qs.stringify(requestBody), config);
    const data = await response;
    return(data.data.doesExist)
  }

  async signupUser(){
    const requestBody = {      
      email: this.state.email.value,
      address: this.state.address.value,
      agreedToTermsAndConditions: true,
      airTMID: this.state.AirTMNum.value,
      firstname: this.state.firstName.value,
      lastname: this.state.lastName.value,
      password: this.state.password.value,
      phone: this.state.phone.value,
      socialID: this.state.socialNum.value
    }
    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    const url = yakeraBackUrl + "/api/auth/signup";

    axios.post(url, qs.stringify(requestBody), config)
        .then(res => {
                console.log("user registered");
                window.location.href = "/";
        })
        .catch(err => {
            console.log("error: " + err.message);
        })

  }
  /*
   * validate all fields
   * check if all fields are valid if yes then submit the Form
   * otherwise set errors for the feilds in the state
   */
  async handleSubmit(evt) {
    evt.preventDefault();

    if(this.state.step === 0){
        this.setState({
            step: 1
        });
        return true;
    }
    // validate all fields
    const { email, password, firstName, lastName, address, AirTMNum, phone, socialNum } = this.state;
    const emailError = validateFields.validateEmail(email.value);
    const passwordError = validateFields.validatePassword(password.value);
    const FNerror = validateFields.validateName(firstName.value);
    const LNerror = validateFields.validateName(lastName.value);
    const AddressError = validateFields.validateAddress(address.value);
    const AirTMError = validateFields.validateNumber(AirTMNum.value);
    const SocialNumError = validateFields.validateNumber(socialNum.value);
    const PhoneError = validateFields.validateNumber(phone.value);
    switch(this.state.step){
      case 1:
        const doesExist = await this.checkemail();
        if(doesExist){
          this.setState({
            errorMessage:"This email is not available",
            email:{
              validateOnChange: true,
              value: this.state.email.value,
              error: "please use another email"
            }
          })
        }
        if ([emailError, passwordError, FNerror, LNerror].every(e => e === false)) {
          //no errors    
          // clear state and show all fields are validated
          this.setState({errorMessage:'', step: this.state.step+1 });
         
        } else {
          if ([emailError, passwordError, FNerror, LNerror].every(e => e === false)){
            console.log("user already exists")
            
          }
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
            },
          }));
        }
        break;

    case 2:
      if ([PhoneError, AddressError, AirTMError, SocialNumError].every(e => e === false)) {
        // no errors submit the form
        console.log('success');
  
        // clear state and show all fields are validated
        this.setState({ step: this.state.step+1 });
       
      } else {
        // update the state with errors
        this.setState(state => ({
          phone: {
            ...state.phone,
            validateOnChange: true,
            error: PhoneError
          },
          address: {
            ...state.address,
            validateOnChange: true,
            error: AddressError
          },
          AirTMNum: {
            ...state.AirTMNum,
            validateOnChange: true,
            error: AirTMError
          },
          socialNum: {
            ...state.socialNum,
            validateOnChange: true,
            error: SocialNumError
          },
        }));
      }
      break;
    case 3:
          if(this.state.checkboxes.a === false || this.state.checkboxes.b === false || this.state.checkboxes.c === false || this.state.checkboxes.d === false || this.state.checkboxes.e === false ){
              this.setState({
                checkboxes:{
                  a: false,
                  b: false,
                  c: false,
                  d: false,
                  e: false
                },
                errorMessage: 'These fields must be checked'
              })
          }else{
            await this.signupUser() ;
            this.setState({
               step: this.state.step+1,
               errorMessage: ""
               });  
          }      
      break;
    default:
      break;
  }
}
handleFacebook(){
  const stringifiedParams = qs.stringify({
    client_id: 676134259977180,
    redirect_uri: "/register",
    scope: ['email'].join(','),
    response_type: 'code',
    auth_type: 'rerequest',
    display:'popup'
  });
  const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;

  window.location.href = facebookLoginUrl;
}

   
    render(){
      const { firstName, lastName, email, password, address, AirTMNum, phone, socialNum } = this.state;
      function ButtonText(props) {
        if(props.step === 0){
          return 'Start'
        }else if(props.step === 3){
          return 'Finish'
        }
        return 'Continue'

      }
        return(
            <div className="register-page">     
             <Card style={{margin: '10% 30%', marginTop:'10%', paddingLeft:'2%', paddingRight:'2%'}}>
                <CardContent>
                    <Typography variant="h4" style={{margin: '5%'}}>Sign up with Yakera in 3 easy steps</Typography>
                    <MultiStepForm activeStep={this.state.step} accentColor='#003049'>
                        <Step label="Details">

                            {/* DETAILS */}

                            <form onSubmit={evt => this.handleSubmit(evt)}>
                            {/* Name fields */}
                            <div >
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
                            <div >
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
                            <div>
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
                           
                    </form>
                        </Step>
                        <Step label="Authentication">
                          {/* Phone field */}
                        <div >
                                <label>Phone Number</label>
                                <input
                                type="text"
                                name="phone"
                                value={phone.value}
                                placeholder="Enter your phone Number"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': phone.error === false },
                                    { 'is-invalid': phone.error }
                                )}
                                onChange={evt =>
                                    this.handleChange(validateFields.validateNumber, evt)
                                }
                                onBlur={evt =>
                                    this.handleBlur(validateFields.validateNumber, evt)
                                }
                                />
                                <div className="invalid-feedback">{phone.error}</div>
                            </div>
                             {/* Address field */}
                            <div >
                                    <label>Address</label>
                                    <input
                                    type="text"
                                    name="address"
                                    value={address.value}
                                    placeholder="Enter your Address"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': address.error === false },
                                        { 'is-invalid': address.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateAddress, evt)
                                    }
                                    onBlur={evt =>
                                        this.handleBlur(validateFields.validateAddress, evt)
                                    }
                                    />
                                    <div className="invalid-feedback">{address.error}</div>
                            </div>

                             {/* Social Security Number field */}
                             <div >
                                    <label>Social Security Number</label>
                                    <input
                                    type="text"
                                    name="socialNum"
                                    value={socialNum.value}
                                    placeholder="Enter your Social Security Number"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': socialNum.error === false },
                                        { 'is-invalid': socialNum.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateNumber, evt)
                                    }
                                    onBlur={evt =>
                                        this.handleBlur(validateFields.validateNumber, evt)
                                    }
                                    />
                                    <div className="invalid-feedback">{socialNum.error}</div>
                            </div>

                             {/* AirTM account Number */}
                             <div >
                                    <label>AirTM account number</label>
                                    <input
                                    type="text"
                                    name="AirTMNum"
                                    value={AirTMNum.value}
                                    placeholder="Enter your AirTM account Number"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': AirTMNum.error === false },
                                        { 'is-invalid': AirTMNum.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateNumber, evt)
                                    }
                                    onBlur={evt =>
                                        this.handleBlur(validateFields.validateNumber, evt)
                                    }
                                    />
                                    <div className="invalid-feedback">{AirTMNum.error}</div>
                            </div>
                        </Step>
                        <Step id='checks' label="Confirmation">
                          <h6>Pease select all that apply</h6>
                          <hr />
                          <input
                            name="a"
                            type="checkbox"
                            checked={this.state.checkboxes.a}
                            onChange={this.handleCheck} />
                          <label>I have never been a Venezuelan government official in the Minister of Interior</label>

                          <br />
                          
                          <input
                            name="b"
                            type="checkbox"
                            checked={this.state.checkboxes.b}
                            onChange={this.handleCheck} />
                          <label>I have never worked for or with the FAES</label>

                          <br />

                          <input
                            name="c"
                            type="checkbox"
                            checked={this.state.checkboxes.c}
                            onChange={this.handleCheck} />
                          <label>I have never been an agent of the SEBIN</label>

                          <br />

                          <input
                            name="d"
                            type="checkbox"
                            checked={this.state.checkboxes.d}
                            onChange={this.handleCheck} />
                          <label>I have never been involved in human rights violations</label>

                          <br />

                          <input
                            name="e"
                            type="checkbox"
                            checked={this.state.checkboxes.e}
                            onChange={this.handleCheck} />
                          <label>I agree to the terms and conditions</label>

                          <br />
                          
                        </Step>
                    </MultiStepForm>
                      <button
                          type="submit"
                          className="btn btn-secondary btn-block"
                          onClick={this.handleSubmit}
                          >
                          <ButtonText step={this.state.step}/>
                      </button>

                    <p style={{color:'red', marginTop:'10px', marginBottom:'-10px'}}>{this.state.errorMessage}</p>
                 
                    <button
                          type="submit"
                          className="btn btn-secondary btn-block"
                          style={{backgroundColor:"#106", marginTop:'20px'}}
                          onClick={this.handleFacebook}
                          >
                          Register with Facebook
                      </button>
                  
                    <Button variant="contained" color="secondary" style={{margin: '15px'}}>Register with Google</Button>
                    <br />
                    <p >Already have an account? Log in <a id='here' href='/login'>here</a></p>
                    
                </CardContent>
                </Card>
            </div>
        )
    }
}

export default oldRegister;
