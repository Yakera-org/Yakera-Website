import React, { useEffect } from "react";

function CampaignSummary(props)
{
    let EN = props.EN;
    let isMobile = props.isMobile;

    useEffect(() => {
        const summary = document.getElementById('campaign-summary');

        if((props.step === 5 && summary.classList.contains('summary-hidden')) || (props.step < 5 && !summary.classList.contains('summary-hidden')))
        {
            summary.classList.toggle('summary-hidden');
        }
    }, [props.step]);

    return (
        <div id="campaign-summary" className="summary-hidden">
            {isMobile
            ?
            <h2 className="subtitle-text-mobile"><span>{EN ? 'Summary' : 'Resumen'}</span></h2>
            :
            <h2 className="subtitle-text"><span>{EN ? 'Summary' : 'Resumen'}</span></h2>
            }

            <p className="info-text">
                {EN
                ?
                'This is the information people will see about your campaign on the site'
                :
                'Esta es la información que las personas verán sobre tu campaña en el sitio'}
            </p>
            
            <p className="summary-label">{EN ? "Campaign's main image" : 'Imagen principal de la campaña'}</p>
            <img src={'https://assets.yakera.org/' + props.data.mainPicture} alt="Main" className="main-img-summary" />
            
            <p className="summary-label">{EN ? "Campaign's title" : 'Título de la campaña'}</p>
            <p className="info-text">{props.data.campaignname}</p>
            
            <p className="summary-label">{EN ? 'Objective (in USD)' : 'Objetivo ($USD)'}</p>
            <p className="summary-funds">${parseFloat(props.data.amount).toFixed(2)}</p>
            
            <p className="summary-label">{EN ? 'Short description' : 'Breve descripción'}</p>
            <p className="info-text">{props.data.description}</p>
            
            <p className="summary-label">{EN ? "Campaign's text" : 'Texto de la campaña'}</p>
            <p className="info-text">{props.data.story}</p>
            <p className="info-text">{props.data.publicstory}</p>
            <p className="info-text">{props.data.moneyuse}</p>
        </div>
    );
}

export default CampaignSummary;
