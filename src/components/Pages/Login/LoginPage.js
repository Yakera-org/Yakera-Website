import React, { useState } from 'react';
import LoginTemplate from './LoginTemplate';
import { validateFields } from './Validation';


const LoginPage = () => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errors: {
      email: null,
      password: null,
    },
  };
  const [data, setData] = useState(initialState);

  const handleChange = event => {
    event.persist();

    setData(data => ({
      ...data,
      [event.target.name]: event.target.value
    }));
    console.log(event.target.name)
    validateForm(event);
  };

  const validateForm = event => {
    let error;

    if (event.target.name === "email") {
      error = validateFields.validateEmail(data.email);
    } else {
      error = validateFields.validatePassword(data.password);
    }
    
    setData(data => ({
      ...data,
      errors: {
        ...data.errors,
        [event.target.name]: error,
      }
    })); 

  }

  const handleSubmit = event => {
    // TODO: make an API call
  }

  return (
    <LoginTemplate 
      handleChange = {handleChange}
      data = {data}
      handleSubmit = {handleSubmit}
    />
  );
}

export default LoginPage;