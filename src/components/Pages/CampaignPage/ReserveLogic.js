import React, { useState } from 'react';
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