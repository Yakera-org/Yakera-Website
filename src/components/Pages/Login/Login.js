import React from 'react';
import LoginVisual from './LoginVisual';

import "./Login.scss"
import LanguageService from '../../../services/language';
import api from "../../../services/api";

const initialState = {
    email: "",
    password: ""
  };

// logic component for login
function Login() {

    const [EN, setEN] = React.useState(false);
    const [data, setData] = React.useState(initialState);
    const [error, setError] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setEN(LanguageService.getLanguage()==='en')
    }, []);

    function handleChange(e){
        setError("")
        setData({
            ...data,
            [e.target.name]: e.target.value
          });
    }

    async function submit(e){
        e.preventDefault()
        if(!validateData()){
            setError(EN ? "Invalid fields." : "Campos no válidos.")
            return
        }

        // fields are filled out, continue
        setLoading(true)
        await callBackend({      
            email: data.email,
            password: data.password
          })
    }

    function validateData(){
        return data.email && data.password
    }

    async function callBackend(requestBody){
        try {
            const res = await api.post("/auth/login", requestBody);
            console.log(res)
        } catch (err) {
            setError(EN ? "User not found." : "Usuario no encontrado.")
        } finally{
            setLoading(false)
        }
    }

    return (
        <div>
            <LoginVisual 
                EN={EN}
                data={data}
                error={error}
                loading={loading}
                handleChange={handleChange}
                submit={submit}
            />
        </div>
    );
}

export default Login;