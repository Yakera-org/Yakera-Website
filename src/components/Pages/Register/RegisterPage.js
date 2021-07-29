import React, {useState, useEffect} from "react";
import RegisterVisuals from './RegisterVisuals'
import { validateFields } from './Validation';


function Register() {

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    socialNum: "",
    airTMNum: "",
    isSubmitting: false,
    check:{
      terms:false,
      newsLetter:false
    },
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      address: null,
      phone: null,
      socialNum: null,
      airTMNum: null,
    },
  };
  const [data, setData] = useState(initialState);
  
  const handleChange = event => {
    if(event.target.name === 'terms'){
      setData({
        ...data,
        check:{
          ...data.check,
          [event.target.name]: !data.check.terms
        }
      })
      return
    }
    if(event.target.name === 'newsLetter'){
      setData({
        ...data,
        check:{
          ...data.check,
          [event.target.name]: !data.check.newsLetter
        }
      })
      return
    }
    setData({
      ...data,
      [event.target.name]: event.target.value
    },);
    validateEntry(event);
  };

  const validateEntry = event => {
    const name = event.target.name;
    const value = event.target.value;
    var error;

    if(name === 'email'){
      error = validateFields.validateEmail(value);
    }else if(name === 'password'){
      error = validateFields.validatePassword(value);
    }else if(name === 'firstName' || name === 'lastName' || name === 'address' || name === 'phone' || name === 'airTMNum' || name === 'socialNum'){
      error = validateFields.validateName(value);
    }

    if (error !== null) {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        errors:{
          ...data.errors,
          [name]: error
        }
      });
    } 
    else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
        errors:{
          ...data.errors,
          [name]: null
        }
      });
    }   
  }

  const validate = (step) =>{
    if (step === 1){
      return validateStep1();
    }else if (step === 2){
      return validateStep2();
    }
  }

  const validateStep1 = () => {
    let emptyWarning = 'This field cannot be empty';
    let firstNameError, lastNameError, emailError, passwordError;

    
    if(!data.firstName){
      firstNameError = emptyWarning;
    }
    if(!data.lastName){
      lastNameError = emptyWarning;
    }
    if(!data.email){
      emailError = emptyWarning;     
    }else{
      emailError = validateFields.validateEmail(data.email);
    }
    if(!data.password){
      passwordError = emptyWarning;      
    }else{
      passwordError = validateFields.validatePassword(data.password);
    }
    
    setData({
      ...data,
      errors: { 
        firstName: firstNameError,
        lastName: lastNameError,
        email: emailError,
        password: passwordError,
      }
    })

    if(data.firstName && data.lastName && data.password && data.email && !emailError && !passwordError){
      return true
    }
    return false
  }
  const validateStep2 = () => {
    let emptyWarning = 'Cannot be empty';
    let addressError, phoneError, airTMNumError, socialNumError;

    
    if(!data.address){
      addressError = emptyWarning;      
    }
    if(!data.phone){
      phoneError = emptyWarning;      
    }
    if(!data.airTMNum){
      airTMNumError = emptyWarning;      
    }
    if(!data.socialNum){
      socialNumError = emptyWarning;      
    }
    
    setData({
      ...data,
      errors: { 
        phone: phoneError,
        airTMNum: airTMNumError,
        address: addressError,
        socialNum: socialNumError,
      }
    })
    if(data.address && data.airTMNum && data.socialNum && data.phone){
      return true
    }
    return false
  }

  function register(){
    console.log(data)
  }
  return (
      <RegisterVisuals data={data} handleChange={handleChange} validate={validate} register={register}/>
  )
}

export default Register
