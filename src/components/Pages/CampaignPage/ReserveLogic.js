import React, { useState } from 'react';

import api from "../../../services/api";
import LanguageService from "../../../services/language";
import { validateFields } from '../Register/Validation';

import ReserveVisual from './ReserveVisual';


function ReserveLogic(props) {

    const initialState = {
        username: "",
        loading: false,
        errors: {
            username: null
        },
    };

    const [data, setData] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = event => {
        event.persist();
        setError("")
        setData(data => ({
            ...data,
            [event.target.name]: event.target.value,
            errors: {
                ...data.errors,
                [event.target.name]: null
            },
        }));
    };

    function validateData(){
        var hasPassed = true
        
        if(validateFields.validateName(data.username) !== false){
            setData(data => ({
                ...data,
                errors: {
                    username: validateFields.validateName(data.username)
                }
            }));
            hasPassed = false
        }
        return hasPassed
    }

    function onConfirm(){
        setError("")
        let canContinue = validateData()
        if (canContinue){
            setData(data => ({
                ...data,
                errors: {
                    username: false,
                },
            }));
            setLoading(true)
            sendToBackend()
        }
    }

    async function sendToBackend() {
        try {
          const payload = {
            slug: props.slug,
            email: props.email,
            name: props.name,
            amount: props.amount,
            tip: props.tip,
            status: "pending",
            comment: props.comment,
            isAnonymous: props.isAnon,
            language: LanguageService.getLanguage(),
            paymentMethod: "reserve",
            reserveUsername: data.username,
          };
          await api.post(`/campaigns/donate`, payload);
          setError("")
        } catch (err) {
          if(err.response.status === 400){
              setError(props.EN ? "We couln't find this transaction on our end. Please double check the Reserve transaction went through." : "")
          }else{
              setError(props.EN ? "Something went wrong on our end. Please try again." : "Algo salió mal de nuestra parte. Inténtelo de nuevo.")
          }
        }

        setLoading(false)
    }    
    
    return (
        <div>
            <ReserveVisual
                EN = {props.EN}
                data = {data}
                amount = {props.amount}
                loading={loading}
                handleChange = {handleChange}
                onConfirm={onConfirm}
                error={error}
            />
        </div>
    );

}

export default ReserveLogic;