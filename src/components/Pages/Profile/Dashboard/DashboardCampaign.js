import React from 'react';
import { userServices } from '../UserService';
import { Progress } from 'react-sweet-progress';
import { Grid } from '@material-ui/core';

const placeholderImage = "https://assets.yakera.org/yakera/yakeraLogo.webp"

function DashboardCampaign(props) {
    const EN = props.EN
    let campaign = props.campaign

    const STATUS = {
        approved: EN ? "Approved": "Approbada",
        denied: EN ? "Denied": "Rechazada",
        progress: EN ? "In Revision": "En Revisión",
        closed: EN ? "Closed": "Cerrado",
        isWithdrawing: EN ? "Withdrawal in process": "Retiro en proceso"
    }
    const inversedSTATUS = userServices.inverse(STATUS)

    const status =  campaign.withdrawalInProgress?
                        STATUS.isWithdrawing
                    : campaign.approved && !campaign.disabled ?
                        STATUS.approved 
                    : campaign.disabled && !campaign.approved?
                        STATUS.denied
                    : !campaign.approved?
                        STATUS.progress
                    : campaign.disabled && campaign.approved?
                        STATUS.closed
                    : ""
    campaign = {
        title: campaign.title || "",
        slug: campaign.slug || "",
        targetAmount: campaign.targetAmount || 0,
        created: campaign.created || "",
        category: campaign.category?.charAt(0).toUpperCase() + campaign.category?.slice(1)  || "",
        description: campaign.description || "",
        status: status,
        image: campaign.mainPicture?.url || placeholderImage,
        amount: campaign.raised + campaign?.zelleRaised || 0,
        raised: campaign.raised || 0,
        zelleRaised: campaign.zelleRaised || 0,
        withdrawn: campaign.withdrawn || 0,
        percent: Math.min((100* ((campaign.raised + campaign?.zelleRaised) / campaign.targetAmount)).toFixed(1), 100) || 0,
    }

    return (
        <div className='dashboard-campaign'>
            <h3>
                {campaign.title}
            </h3>

            <hr />

            <section id="info">
                <p><span id="orange">{EN ? "Created" : "Creado"}</span>: {campaign.created}</p>
                <p><span id="orange">{EN ? "Category" : "Categoría"}</span>: {campaign.category}</p>
                <p><span id="orange">{EN ? "Description" : "Descripción"}</span>: {campaign.description}</p>
                {campaign.status === STATUS.closed?
                    <p><span id="orange">{EN ? "Total Raised" : "Recaudado total"}</span>: ${campaign.amount}</p>
                :
                ""}
                <p><span id="status">{EN ? "Status" : "Estatus"}</span>: <span id={inversedSTATUS[campaign.status]}>{campaign.status}</span></p>
                </section>

            <section className="in-revision" id={campaign.status !== STATUS.approved && campaign.status !== STATUS.isWithdrawing ? "greyed-out" : ""}>
                <div className='img-wrapper'>
                    <img src={campaign.image} alt="campaign-banner" />
                </div>
                <div id='progress-bar'>
                    <Progress theme={{
                        default: {
                            symbol: '',
                            color: '#71b98f'
                        }
                    }}
                    status="default"
                    percent={ campaign.percent }/>
                </div>

                {
                    campaign.status === STATUS.approved ?
                    <div className='totals'>
                        <h4>
                            {EN ? "Raised so far:" : "Recaudado hasta hoy:"}
                        </h4>
                        <section className='raised'>
                            <section>            
                                <p>
                                    {EN ? "Yakera: " : "Yakera: "} 
                                    
                                    <span id='orange'> ${campaign.raised}</span> 
                                </p>
                                
                                {campaign.zelleRaised > 0?
                                    <p>
                                        {EN ? "Zelle: " : "Zelle: "} 
                                        
                                        <span id='purple'> ${campaign.zelleRaised}</span> 
                                    </p>
                                    :
                                    ""
                                }
                                {
                                    campaign.withdrawn > 0?
                                    <>
                                    <p>
                                        {EN ? "Amount withdrawn:" : "Cantidad retirada:"}

                                        <span id="orange"> -${campaign.withdrawn}</span>
                                    </p>
                                    </>
                                    :
                                    ""
                
                                }

                                <hr />
                                
                                <p id='total'>
                                    {EN ? "Available Funds: " : "Fondos disponibles: "} 
                                    
                                    <span id={campaign.raised - campaign.withdrawn === 0? "grey" : 'green'}><b>${campaign.raised - campaign.withdrawn}</b></span> 
                                </p>
                            </section>
                        </section>
                    </div>
                    :
                    ""
                }


                <Grid container spacing={1} className='button-area' id={campaign.status === STATUS.denied || campaign.status === STATUS.closed ? "no-display" :""}>
                    <Grid item xs={6} sm={6} >
                        <button name={campaign.slug} id="top" style={{backgroundColor:campaign.raised - campaign.withdrawn === 0 ?"grey":""}} onClick={props.withdrawFunds} disabled={campaign.status !== STATUS.approved || campaign.raised - campaign.withdrawn === 0 }>
                            {EN ? "Withdraw Funds" : "Retirar Fondos"}
                        </button>
                    </Grid>
                    <Grid item xs={6} sm={6} >
                        <button name={campaign.slug} id="top" onClick={props.closeCampaign} disabled={campaign.status !== STATUS.approved}>
                            {EN ? "Close Campaign" : "Cerrar Campaña"}
                        </button>
                    </Grid>
                    <Grid item xs={12} sm={12} >
                        <button name={campaign.slug} onClick={props.goToCampaign} disabled={campaign.status !== STATUS.approved && campaign.status !== STATUS.isWithdrawing}>
                            {EN ? "Go to my campaign" : "Ir a mi Campaña"}  
                        </button>
                    </Grid>
                </Grid>
            </section>

        </div>
    );
}

export default DashboardCampaign;