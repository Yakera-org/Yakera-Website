import React, { useState } from 'react';
import LoginTemplate from './LoginTemplate';
import { validateFields } from './Validation';


const LoginPage = () => {
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errors: {
      email: "",
      password: ""
    },
  };
  const [data, setData] = React.useState(initialState);

  const handleChange = event => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
    // TODO: check if you can do the validation here instead
  };

  const validateForm = () => {
    const emailError = validateFields.validateEmail(data.email);
    const passwordError = validateFields.validatePassword(data.password);

    if (emailError == true) {
      data.errors.email = emailError;
    }

    if (passwordError == true) {
      data.errors.password = passwordError;
    }
    
  }

  const handleSubmit = event => {
    // TODO: make an API call
  }

  return (
    <LoginTemplate 
      handleChange = {handleChange}
      data = {data}
      validateForm = {validateForm}
      handleSubmit = {handleSubmit}
    />
  );
}

export default LoginPage;