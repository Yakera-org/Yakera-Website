import React, { PureComponent } from 'react'
import classnames from 'classnames';
import { validateFields } from '../Register/Validation';
import ConsentCard from '../CampaignPage/consentCard';

class PaymentDetails extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            checkError:"",
            age:false,
            consent:false,
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
        this.onPrivacy = this.onPrivacy.bind(this);
        this.onContinue = this.onContinue.bind(this);
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

    onContinue(){
        this.props.onContinue(this.state.amount.value, this.state.email.value, this.state.name.value )
    }

    render() {
        const { amount, name, email } = this.state;
        const language = this.props.language;
        var EN = true;
        if(language !=="en"){
            EN = false
        }
        return (
            <div >

                <ConsentCard open={this.state.openPrivacy} onClose={this.onPrivacy}/>

                <h1 >
                    {EN ? 'Donate Now' : 'Done ahora'}
                </h1>
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
                <div className="check-text" style={{marginTop:'0px'}} >
                    {EN ? 'I confirm to be 18 or over' : 'Confirmo tener 18 años o más'}   
                </div>

                <div style={{clear:'both', color:'#d62828', fontSize:'20px', marginBottom:'10px'}}>{this.state.checkError}</div>

                <button
                    type="submit"
                    className="btn btn-secondary btn-block payment-start-button"    
                    onClick={this.onContinue}                   
                    >
                        {EN ? 'Donate' : 'Donar'}
                </button>               
        </div> 
        )
    }
}

export default PaymentDetails