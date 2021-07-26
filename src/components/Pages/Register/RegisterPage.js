import React, {useState} from "react";
import RegisterVisuals from './RegisterVisuals'


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
    });
    // validateForm(event);
    console.log(event.target.value)
  };
  return (
      <RegisterVisuals data={data} handleChange={handleChange}/>
  )
}

export default Register
