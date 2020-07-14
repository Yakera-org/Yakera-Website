import React, { Component } from 'react';

import CardForDonation from './cardForDonation'



class donate extends Component{
    render(){
        return(
            <div className="donate">     
             <h1 style={{padding:'45px'}}>
                 Donate Page
             </h1>
             <CardForDonation name="Garcia" cause="medicine"/>
             <CardForDonation name="Enrique" cause="car" />
             <CardForDonation name="Gustavo" cause="food" />
            </div>
        )
    }
}

export default donate;