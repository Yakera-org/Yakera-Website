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
    validateForm(event);
  };

  const validateForm = event => {
    let error;
    const name = event.target.name;

    if (name === "email") {
      error = validateFields.validateEmail(data.email);
      if (error !== null) {
        console.log(data);
        setData({
          ...data,
          "errors.email": error
        });
      } 
      else {
        setData({
          ...data,
          "error.email": null,
        });
      }
    } else {
      error = validateFields.validatePassword(data.password);
      if (error !== null) {
        setData({
          ...data,
          "error.password": error,
        });
      } else {
        setData({
          ...data,
          "error.password": null,
        });
      }
    }

    if (error !== null) {
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