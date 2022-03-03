import React from 'react';

function CardRaised(props) {
    const EN = props.EN;
    //const campaign = props.campaign;

    return (
        <div className='raised'>
            <p id='dash-raised'>
                {EN ? "Raised so far " : "Elevado hasta ahora: "}        
            </p>

            <hr />
            
            <p>
                {EN ? "Yakera: " : "Yakera: "} 
                
                <span id='dash-stats'>100$</span> 
            </p>
            <p id='zelle'>
                {EN ? "Zelle: " : "Zelle: "} 
                
                <span id='dash-stats'>50$</span> 
            </p>

            <hr />
            
            <p id='total'>
                {EN ? "Total: " : "Total: "} 
                
                <span id='dash-stats'>150$</span> 
            </p>

        </div>
    );
}

export default CardRaised;