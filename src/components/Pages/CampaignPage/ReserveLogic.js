import React, { useState } from 'react';

import api from "../../../services/api";
import LanguageService from "../../../services/language";
import { validateFields } from '../Register/Validation';

import ReserveVisual from './ReserveVisual';


function ReserveLogic(props) {

    const initialState = {
        username: "",
        errors: {
            username: null
        },
    };

    const [data, setData] = useState(initialState);
    const [error, setError] = useState("");

    const handleChange = event => {
        event.persist();
        setData({
            [event.target.name]: event.target.value
        });
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
        setData(data => ({
            ...data,
            errors: {
                username: false,
            },
        }));
        console.log("hello");
        sendToBackend()
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
        } catch (err) {
          console.log(err);
        }
    }    
    
    return (
        <div>
            <ReserveVisual
                EN = {props.EN}
                data = {data}
                amount = {props.amount}
                handleChange = {handleChange}
                onConfirm={onConfirm}
            />
        </div>
    );

}

export default ReserveLogic;