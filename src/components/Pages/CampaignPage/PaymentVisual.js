import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import classnames from 'classnames';
import { validateFields } from '../Register/Validation';
import PrivacyCard from './consentCard';
import Paypal from './Paypal';


class PaymentVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            checkError:"",
            age:false,
            consent:false,
            openPrivacy: false,
            PaypalId:0,
            amount: {
                value: '',
                validateOnChange: false,
                error: '',
              },
            name: {
                value: '',
                validateOnChange: false,
                error: '',
            },
            email: {
                value: '',
                validateOnChange: false,
                error: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.onConsentCheck = this.onConsentCheck.bind(this);
        this.onAgeCheck = this.onAgeCheck.bind(this);
        this.onDonateStart = this.onDonateStart.bind(this);
        this.onPrivacy = this.onPrivacy.bind(this);
        this.onSuccess = this.onSuccess.bind(this);
    }

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

    onConsentCheck(){
        this.setState({
            consent: !this.state.consent
        })
    }

    onAgeCheck(){
        this.setState({
            age: !this.state.age
        })
    }

    onPrivacy(){
        this.setState({
            openPrivacy: !this.state.openPrivacy
        })
    }


    onDonateStart(){
        const { amount, name, email } = this.state;
        const amountError = validateFields.validateNumber(amount.value);
        const nameError = validateFields.validateName(name.value);
        const emailError = validateFields.validateEmail(email.value);
        
        if(this.state.age === false || this.state.consent === false){
            var response = ""
            if(this.props.language==="en"){
                response = 'All fields need to be checked'
            }else{
                response = 'Todos los campos deben ser revisados'
            }
            this.setState({
                checkError: response
            })
        }else{
            this.setState({
                checkError:''
            })

            if ([amountError, nameError, emailError].every(e => e === false)) {

                this.setState({
                    hasAmount: true
                })         
            } else {
                // update the state with errors
                this.setState(state => ({
                amount: {
                    ...state.amount,
                    validateOnChange: true,
                    error: amountError
                },
                name: {
                    ...state.name,
                    validateOnChange: true,
                    error: nameError
                },
                email: {
                    ...state.email,
                    validateOnChange: true,
                    error: emailError
                }
                }));
            } 
        }
    }
    async onSuccess(details, data) {        
        const { amount, name, email } = this.state;
        
        await this.props.addAmount(data.payerID, amount.value, name.value, email.value);
        

        this.props.onPayPalOff();
    }
    

    render() {
        const { amount, name, email } = this.state;
        const language = this.props.language;
        var EN = true;
        if(language ==="en"){
            EN = true
        }else{
            EN = false
        }
        return (
            <div className="payment-visual">
                 <Card id="donateRef" className="payment-card">
                    <h1 >
                        {EN ? 'Donate Now' : 'Done ahora'}
                    </h1>

                    <div className="payment-card-sec">

                    {!this.state.hasAmount
                        ? <div >
                            <p>{EN ? 'Please enter details below' : 'Ingrese los detalles a continuación'}</p>
                            <input
                                type="number"
                                name="amount"
                                value={amount.value}
                                placeholder="$"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': amount.error === false },
                                    { 'is-invalid': amount.error }
                                    )}
                                    onChange={evt =>
                                         this.handleChange(validateFields.validateNumber, evt)
                                    }
                                    />
                            <div >{amount.error}</div> 

                            <input
                                type="text"
                                name="email"
                                value={email.value}
                                placeholder="Email"
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': email.error === false },
                                    { 'is-invalid': email.error }
                                    )}
                                    onChange={evt =>
                                        this.handleChange(validateFields.validateEmail, evt)
                                    }                            
                                    
                                    />
                            <div >{email.error}</div> 
                            
                            <input
                                type="text"
                                name="name"
                                value={name.value}
                                placeholder={EN ? 'Name' : 'Nombre'}
                                className={classnames(
                                    'form-control',
                                    { 'is-valid': name.error === false },
                                    { 'is-invalid': name.error }
                                    )}
                                    onChange={evt =>
                                      this.handleChange(validateFields.validateName, evt)
                                    }                                  
                                    
                                    />
                            <div >{name.error}</div> 
                            
                            <input
                                name="consent"
                                type="checkbox"
                                onChange={this.onConsentCheck}
                                id="check-consent"                                    
                                className={classnames(
                                    'form-control'
                                    )}
                            />
                            <div className="check-text" >
                                    {EN ? 'I consent to the' : 'Consiento al'}
                                <button
                                    id="privacy-button" 
                                    onClick={this.onPrivacy}
                                    >
                                    {EN ? 'privacy form' : 'contrato de privacidad'}
                                </button>  
                            </div>

                            <input
                                name="age"
                                type="checkbox"
                                onChange={this.onAgeCheck}
                                style={{ marginBottom:'5px', marginTop:'-15px', width:'15px', float:'left', clear:'both'}}
                                className={classnames(
                                    'form-control'
                                    )}
                            />
                            <div className="check-text" style={{marginTop:'-5px'}} >
                                {EN ? 'I confirm to be 18 or over' : 'Confirmo tener 18 años o más'}   
                            </div>

                            <div style={{clear:'both', color:'#d62828', fontSize:'20px', marginBottom:'10px'}}>{this.state.checkError}</div>

                            <button
                                type="submit"
                                className="btn btn-secondary btn-block payment-start-button"    
                                onClick={this.onDonateStart}                   
                                >
                                    {EN ? 'Donate' : 'Donar'}
                            </button>               
                    </div> 
                        :
                         <div className="payment-slit">
                        <p>
                            {EN ? 'You are about to donate' : 'Estás a punto de donar'} <b>{this.state.amount.value} $ </b>
                        </p>
                        <p>                   
                            {EN ? 'Please put your bank details below' : 'Por favor ingrese sus datos bancarios a continuación'} 
                        </p>  
                            <Paypal amount={this.state.amount.value} onSuccess={this.onSuccess} onClick={this.props.onPayPalOn} onError={this.props.onPayPalOff} onCancel={this.props.onPayPalOff}/>
                        </div>  
                    }
                    </div>    
                </Card>

                 <PrivacyCard open={this.state.openPrivacy} onClose={this.onPrivacy}/>   
            </div>
        );
    }
}

export default PaymentVisual;