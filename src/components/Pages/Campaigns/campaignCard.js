import React from 'react';

import "./campaignCard.css"


function campaignCard(props) {
    const campaign= props.campaign
    const amount= props.amount
    const EN= props.EN // for translations

    return (
        <div>
            Campaign: {campaign.title}
            <br />
            amount: {amount}
        </div>
    );
}

export default campaignCard;