import React from 'react';
import LoginVisual from './LoginVisual';

import "./Login.scss"

const initialState = {
    email: "",
    password: "",
    loading: false,
    errors: {
      email: null,
      password: null,
    },
  };

// logic component for login
function Login() {
    return (
        <div>
            <LoginVisual 
                EN={true}
                data={initialState}
            />
        </div>
    );
}

export default Login;