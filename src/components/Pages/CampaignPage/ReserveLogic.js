import React from 'react';
import ReserveVisual from './ReserveVisual';

function ReserveLogic(props) {
    
    return (
        <div>
            <ReserveVisual
                EN = {props.EN}
                amount = {props.amount}
            />
        </div>
    );

}

export default ReserveLogic;