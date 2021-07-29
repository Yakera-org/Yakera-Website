import React, {useState, useEffect} from "react";
import RegisterVisuals from './RegisterVisuals'
import { validateFields } from './Validation';


function Register() {

  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isSubmitting: false,
    errors: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
    },
  };
  const [data, setData] = useState(initialState);
  
  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    },);
    validateEntry(event);

    console.log(data.errors)
  };

  const validateEntry = event => {
    const name = event.target.name;
    const value = event.target.value;
    var error;

    if(name === 'email'){
      error = validateFields.validateEmail(value);
    }else if(name === 'password'){
      error = validateFields.validatePassword(value);
    }else if(name === 'firstName' || name === 'lastName'){
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

  const validate = () => {
    let emptyWarning = 'Cannot be empty';
    let firstNameError, lastNameError, emailError, passwordError;

    if(!data.firstName){
      firstNameError = emptyWarning;
    }
    if(!data.lastName){
      lastNameError = emptyWarning;
    }
    if(!data.email){
      emailError = emptyWarning;     
    }
    if(!data.password){
      passwordError = emptyWarning;      
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
    return false
  }

  return (
      <RegisterVisuals data={data} handleChange={handleChange} validate={validate}/>
  )
}

export default Register
