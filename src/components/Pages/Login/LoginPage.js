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
    setData({
      ...data,
      [event.target.name]: event.target.value
    });
    // TODO: check if you can do the validation here instead
    validateForm(event);
  };

  const validateForm = event => {
    let error;
    const name = event.target.name;

    if (name == "email") {
      error = validateFields.validateEmail(data.email);
      if (error == true) {
        setData({
          ...data,
          [error.email]: error,
        });
      } else {
        setData({
          ...data,
          [error.email]: false,
        });
      }
    } else {
      error = validateFields.validatePassword(data.password);
      if (error == true) {
        setData({
          ...data,
          [error.password]: error,
        });
      } else {
        setData({
          ...data,
          [error.password]: false,
        });
      }
    }

    console.log(error);

    if (error == true) {
      return true
    }
    return false  
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