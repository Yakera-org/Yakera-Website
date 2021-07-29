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
    console.log(event.target.value)
    setData({
      ...data,
      [event.target.name]: event.target.value
    },);
    validateEntry(event);
  };

  const validateEntry = event => {
    const name = event.target.name;

    const emailError = validateFields.validateEmail(data.email);
    const passwordError = validateFields.validatePassword(data.password);
    const FNerror = validateFields.validateName(data.firstName);
    const LNerror = validateFields.validateName(data.lastName);

      if (emailError !== null) {
        setData({
          ...data,
          [event.target.name]: event.target.value,
          errors:{[name]: emailError}
        });
      } 
      else {
        setData({
          ...data,
          [event.target.name]: event.target.value,
          errors:{[name]: null}
        });
      }
    
  }
  

  const validate = () => {
    console.log(data)
    return false
  }

  return (
      <RegisterVisuals data={data} handleChange={handleChange} validate={validate}/>
  )
}

export default Register
