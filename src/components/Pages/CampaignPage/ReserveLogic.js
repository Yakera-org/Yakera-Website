import React, { useState } from 'react';

import api from "../../../services/api";
import LanguageService from "../../../services/language";

import ReserveVisual from './ReserveVisual';


function ReserveLogic(props) {

    const initialState = {
        username: ""
    }

    const [data, setData] = useState(initialState);

    const handleChange = event => {
        event.persist();
        setData({
            [event.target.name]: event.target.value
        });
    };

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
            />
        </div>
    );

}

export default ReserveLogic;