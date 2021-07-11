import React, { Component, Fragment } from 'react';
import { Button, Form, FormGroup, Label, Input} from 'reactstrap'
import { Grid, Link, Card, CardContent, Typography} from '@material-ui/core';
import { MultiStepForm, Step } from 'react-multi-form';
import classnames from 'classnames';
import './RegisterPage.css';
import { validateFields } from './Validation';
import background from '../../../pics/pattern-yakera-blue.png'


class RegisterTemplate extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.initialState;
        this.handleSubmit = this.props.handleSubmit.bind(this);
        this.handleCheck = this.props.handleCheck.bind(this);
        this.handleBlur = this.props.handleBlur;
        this.handleChange = this.props.handleChange;
    }
    
  render() {

    const { firstName, lastName, email, password, address, AirTMNum, phone, socialNum } = this.state;
    
    function ButtonText(props) {
        if(props.step === 0){
            return 'Start'
        }else if(props.step === 3){
            return 'Finish'
        }
        return 'Continue'

    }
    return (
        <div style={{ backgroundImage: `url(${background})`}}>  
            <Card className='register-card'>
                <CardContent className='register-form'>
                    <h1><span className='font-weight-bold'>Join Yakera</span></h1>
                    <h2>Sign up in 3 easy steps</h2>
                    
                    <MultiStepForm activeStep={this.state.step} accentColor='#0E325E'>
                        <Step label="Details">
                            <Form onSubmit={evt => this.handleSubmit(evt)}>
                                <FormGroup>
                                    <Label>First Name</Label>
                                    <Input
                                        type="text"
                                        name="firstName"
                                        value={firstName.value}
                                        placeholder="First name"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': firstName.error === false },
                                                { 'is-invalid': firstName.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateName, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateName, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{firstName.error}</div>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Last Name</Label>
                                    <Input
                                        type="text"
                                        name="lastName"
                                        value={lastName.value}
                                        placeholder="Last name"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': lastName.error === false },
                                                { 'is-invalid': lastName.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateName, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateName, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{lastName.error}</div>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type="email"
                                        name="email"
                                        value={email.value}
                                        placeholder="Email"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': email.error === false },
                                                { 'is-invalid': email.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateEmail, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateEmail, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{email.error}</div>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={password.value}
                                        placeholder="Password"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': password.error === false },
                                                { 'is-invalid': password.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validatePassword, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validatePassword, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{password.error}</div>
                                </FormGroup>
                            </Form>
                        </Step>
                    
                        <Step label="Authentication">
                            <Form onSubmit={evt => this.handleSubmit(evt)}>
                                <FormGroup>
                                    <Label>Phone Number</Label>
                                    <Input
                                        type="text"
                                        name="phone"
                                        value={phone.value}
                                        placeholder="Phone Number"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': phone.error === false },
                                                { 'is-invalid': phone.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateNumber, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateNumber, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{phone.error}</div>
                                </FormGroup>

                                <FormGroup>
                                    <Label>Address</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        value={address.value}
                                        placeholder="Address"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': address.error === false },
                                                { 'is-invalid': address.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateAddress, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateAddress, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{address.error}</div>
                                </FormGroup>


                                <FormGroup>
                                    <Label>Social Security Number</Label>
                                    <Input
                                        type="text"
                                        name="socialNum"
                                        value={socialNum.value}
                                        placeholder="Social Security Number"
                                        className={
                                                classnames(
                                                'form-control',
                                                { 'is-valid': socialNum.error === false },
                                                { 'is-invalid': socialNum.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateNumber, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateNumber, evt)
                                        }
                                    />
                                        <div className="invalid-feedback">{socialNum.error}</div>
                                </FormGroup>

                                <FormGroup>
                                    <Label>AirTM Account Number</Label>
                                    <Input
                                        type="text"
                                        name="AirTMNum"
                                        value={AirTMNum.value}
                                        placeholder="AirTM account Number"
                                        className={
                                            classnames(
                                                'form-control',
                                                { 'is-valid': AirTMNum.error === false },
                                                { 'is-invalid': AirTMNum.error }
                                            )
                                        }
                                        onChange={evt =>
                                            this.handleChange(validateFields.validateNumber, evt)
                                        }
                                        onBlur={evt =>
                                            this.handleBlur(validateFields.validateNumber, evt)
                                        }
                                    />
                                    <div className="invalid-feedback">{AirTMNum.error}</div>
                                </FormGroup>
                            </Form>
                        </Step>

                        <Step id='checks' label="Confirmation">
                            <h6>Pease select all that apply</h6>
                            <hr />

                            <Form onSubmit={evt => this.handleSubmit(evt)}>
                                <FormGroup check style={{marginBottom:'2%'}}>
                                    <Label check>
                                        <Input
                                            type="checkbox" 
                                            name="a"
                                            checked={this.state.checkboxes.a}
                                            onChange={this.handleCheck}
                                        />{' '}
                                        I have never been a Venezuelan government official in the Minister of Interior
                                    </Label>
                                </FormGroup>

                                <FormGroup check style={{marginBottom:'2%'}}>
                                    <Label check>
                                        <Input
                                            type="checkbox" 
                                            name="b"
                                            checked={this.state.checkboxes.b}
                                            onChange={this.handleCheck}
                                        />{' '}
                                        I have never worked for or with the FAES
                                    </Label>
                                </FormGroup>

                                <FormGroup check style={{marginBottom:'2%'}}>
                                    <Label check>
                                        <Input
                                            type="checkbox" 
                                            name="c"
                                            checked={this.state.checkboxes.c}
                                            onChange={this.handleCheck}
                                        />{' '}
                                        I have never been an agent of the SEBIN
                                    </Label>
                                </FormGroup>

                                <FormGroup check style={{marginBottom:'2%'}}>
                                    <Label check>
                                        <Input
                                            type="checkbox" 
                                            name="d"
                                            checked={this.state.checkboxes.d}
                                            onChange={this.handleCheck}
                                        />{' '}
                                        I have never been involved in human rights violations
                                    </Label>
                                </FormGroup>

                                <FormGroup check style={{marginBottom:'4%'}}>
                                    <Label check>
                                        <Input
                                            type="checkbox" 
                                            name="e"
                                            checked={this.state.checkboxes.e}
                                            onChange={this.handleCheck}
                                        />{' '}
                                        I agree to the terms and conditions
                                    </Label>
                                </FormGroup>
                            </Form>

                        </Step>
                    </MultiStepForm>
                    
                    <Button
                        className='btn-lg btn-light btn-block'
                        type="submit"
                        onClick={this.handleSubmit}
                        style={{backgroundColor:"#EC933E", color:'white'}}
                    >
                        <ButtonText step={this.state.step}/>
                    </Button>
                    
                    <p style={{color:'red', marginTop:'10px', marginBottom:'-10px'}}>{this.state.errorMessage}</p>
                    
                    <Grid
                        container
                        style={{marginTop:'4%'}}
                        alignItems="center"
                        justify="center"
                        spacing={1}
                    >
                        <Grid item xs>
                            <Button
                                type="submit"
                                className="btn-lg btn-dark btn-block"
                                style={{backgroundColor:"#0E325E"}}
                                onClick={this.handleFacebook}
                            >
                                Use Facebook
                            </Button>
                        </Grid>

                        <Grid item xs>
                            <Button
                                variant="contained"
                                style={{backgroundColor:"#0E325E"}}
                                className="btn-lg btn-dark btn-block"
                            >
                                Use Google
                            </Button>
                        </Grid>
                    </Grid>

                    <Link
                        href="/login"
                        style={{
                            marginTop:'4%',
                            display: 'flex',
                            justifyContent:'center',
                            alignItems:'center'
                        }}
                    >
                        Already have an account? Log in here
                    </Link>

                </CardContent>
            </Card>
        </div>
        )
    }
}

export default RegisterTemplate;