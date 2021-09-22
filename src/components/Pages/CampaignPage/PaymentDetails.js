import React, { PureComponent } from 'react'
import classnames from 'classnames';
import { Grid } from '@material-ui/core';
import { validateFields } from '../Register/Validation';
import ConsentCard from '../CampaignPage/consentCard';

class PaymentDetails extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            checkError:"",
            openPrivacy: false,
            age:false,
            consent:false,
            noTip: false,
            yesTip: true,
            amount: {
                value: this.props.presetAmount ? this.props.presetAmount : '',
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
            },
            comment: {
                value: '',
                validateOnChange: false,
                error: '',
            },
            tip: {
                value: 5,
                validateOnChange: false,
                error: '',
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.onConsentCheck = this.onConsentCheck.bind(this);
        this.onAgeCheck = this.onAgeCheck.bind(this);
        this.onYesTipCheck = this.onYesTipCheck.bind(this);
        this.onNoTipCheck = this.onNoTipCheck.bind(this);
        this.onPrivacy = this.onPrivacy.bind(this);
        this.onContinue = this.onContinue.bind(this);
    }

    handleChange(validationFunc, evt) {
        const fieldVal = evt.target.value;
        const field = evt.target.name;
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
    onNoTipCheck(){
        this.setState({
            noTip: true,
            yesTip: false
        })
    }
    onYesTipCheck(){
        this.setState({
            noTip: false,
            yesTip: true
        })
    }
    onPrivacy(){
        this.setState({
            openPrivacy: !this.state.openPrivacy
        })
    }

    onContinue(){
        let isValidated = this.validateData()
        var tip = this.state.tip.value
        if(this.state.noTip){
            tip = 0
        }
        if(isValidated){
            this.props.onContinue(this.state.amount.value, this.state.email.value, this.state.name.value, tip, this.state.comment.value);
        }
    }

    validateData(){
        let emptyWarning = 'This field cannot be empty';
        let amountError, emailError, nameError, tipError, commentError;

        let isValid = false;
    
        
        if(!this.state.amount.value){
            amountError = emptyWarning;
        }else{
            amountError = validateFields.validateNumber(this.state.amount.value + '')
        }
        if(!this.state.email.value){
          emailError = emptyWarning;     
        }else{
          emailError = validateFields.validateEmail(this.state.email.value);
        }
        if(!this.state.name.value){
          nameError = emptyWarning;      
        }else{
            nameError = validateFields.validateName(this.state.name.value)
        }
        if(!this.state.comment.value){
            commentError = emptyWarning;      
        }else{
            commentError = validateFields.validateName(this.state.comment.value); // TODO: Validate comment
        }

        if(this.state.yesTip){
            if(!this.state.tip.value){
                tipError = emptyWarning;
            }else{
                tipError = validateFields.validateNumber(this.state.tip.value + '')
            }
        }
        
        this.setState(state => ({
            amount:{
                ...state['amount'],
                error: amountError
            },
            name:{
                ...state['name'],
                error: nameError
            },
            email:{
                ...state['email'],
                error: emailError
            },
            tip:{
                ...state['tip'],
                error: tipError
            },
            comment:{
                ...state['comment'],
                error: commentError
            }
        }))

        if(!this.state.age || !this.state.consent){
            isValid = false
            this.setState({
                checkError: 'These checkboxes must be ticked.'
            })
        }else if (this.state.age && this.state.consent){
            isValid = true
            this.setState({
                checkError: ''
            })
        }
        if(isValid && !amountError && !emailError && !nameError && !tipError){
            return true
        }
        
        return false
      }

    render() {
        const { amount, name, email, comment, tip } = this.state;
        const language = this.props.language;
        var EN = true;
        if(language !=="en"){
            EN = false
        }
        return (
            <div >

                <ConsentCard open={this.state.openPrivacy} onClose={this.onPrivacy}/>

                <p>{EN ? 'Please enter details below' : 'Ingrese los detalles a continuación'}</p>

                
                <input
                    type="number"
                    name="amount"
                    value={amount.value}
                    placeholder="Amount ($)*"
                    className={classnames(
                        'form-control',
                        { 'is-valid': amount.error === false },
                        { 'is-invalid': amount.error }
                        )}
                        onChange={evt =>
                                this.handleChange(validateFields.validateNumber, evt)
                        }
                        />
                <div className='error-msg'>{amount.error}</div> 

                <input
                    type="text"
                    name="email"
                    value={email.value}
                    placeholder="Email*"
                    className={classnames(
                        'form-control',
                        { 'is-valid': email.error === false },
                        { 'is-invalid': email.error }
                        )}
                        onChange={evt =>
                            this.handleChange(validateFields.validateEmail, evt)
                        }                            
                        
                        />
                <div className='error-msg'>{email.error}</div> 
                
                <input
                    type="text"
                    name="name"
                    value={name.value}
                    placeholder={EN ? 'Name*' : 'Nombre*'}
                    className={classnames(
                        'form-control', 
                        { 'is-valid': name.error === false },
                        { 'is-invalid': name.error }
                        )}
                        onChange={evt =>
                            this.handleChange(validateFields.validateName, evt)
                        }                                  
                        
                        />
                <div className='error-msg'>{name.error}</div> 

                <p id='required'> * required</p>
                
                <input
                    type="text"
                    name="comment"
                    value={comment.value}
                    placeholder={EN ? 'Leave a supportive comment' : 'Deja un comentario de apoyo'}
                    className={classnames(
                        'form-control',
                        { 'is-valid': comment.error === false },
                        { 'is-invalid': comment.error }
                        )}
                        onChange={evt =>
                            this.handleChange(validateFields.validateName, evt)
                        }                                  
                        
                        />
                <div >{comment.error}</div> 
                

                <hr id='donate-now-hr'/>

                <p>Would you like to leave a tip?* </p>

                <input
                    name="tip-yes"
                    type="checkbox"
                    checked={this.state.yesTip}
                    onChange={this.onYesTipCheck}
                    style={{ marginBottom:'5px', marginTop:'-15px', width:'15px', float:'left', clear:'both'}}
                    className={classnames(
                        'form-control'
                        )}
                />
                <div className="check-text" style={{margin:'0px'}} >
                    {EN ? 'Yes, please' : 'Si'}   
                </div>

                {
                    this.state.yesTip

                    ?
                    <div id='tip-area'>
                        <Grid container spacing={0} style={{ alignItems:'flex-start', padding:'0 10%', marginTop:'-10px'}}>
                            <Grid item xs={12} sm={4} >
                                <div className='label'>Tip ($):</div>
                            </Grid>
                            <Grid item xs={12} sm={8} style={{marginTop:'8px'}}>
                                <input
                                    type="number"
                                    name="tip"
                                    value={tip.value}
                                    placeholder="Tip ($)*"
                                    className={classnames(
                                        'form-control',
                                        { 'is-valid': tip.error === false },
                                        { 'is-invalid': tip.error }
                                        )}
                                        onChange={evt =>
                                                this.handleChange(validateFields.validateNumber, evt)
                                        }
                                />
                            </Grid>
                        </Grid>
                                
                        <div className='error-msg'>{tip.error}</div> 
                        <br />
                    </div>

                    :

                    ''
                }

                <input
                    name="tip-no"
                    type="checkbox"
                    checked={this.state.noTip}
                    onChange={this.onNoTipCheck}
                    style={{ marginBottom:'5px', marginTop:'-15px', width:'15px', float:'left', clear:'both'}}
                    className={classnames(
                        'form-control'
                        )}
                />
                <div className="check-text" style={{marginTop:'0px'}} >
                    {EN ? "No, I don't want to leave a tip" : 'No'}   
                </div>

                <p id='tip-desc'>*Leaving a tip helps us maintain and bring you new features</p>

                <hr id='donate-now-hr'/>
                
                
                <input
                    name="consent"
                    type="checkbox"
                    onChange={this.onConsentCheck}
                    id="check-consent"            
                    style={{ marginBottom:'0px', marginTop:'0px', width:'15px', float:'left', clear:'both'}}                        
                    className={classnames(
                        'form-control'
                        )}
                />  
                <div className="check-text" style={{marginTop:'30px'}}>
                        {EN ? 'I consent to the' : 'Consiento al'}
                    <button
                        id="privacy-button" 
                        onClick={this.onPrivacy}
                        >
                        {EN ? 'privacy form *' : 'contrato de privacidad'}
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
                    {EN ? 'I confirm to be 18 or over*' : 'Confirmo tener 18 años o más'}   
                </div>

                <div className='error-msg' style={{marginTop:'-20px', textAlign:'left', marginLeft:'20px'}}>{this.state.checkError}</div>
                <br />

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