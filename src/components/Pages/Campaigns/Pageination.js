import React, {useState} from 'react';
import HashLoader from "react-spinners/HashLoader";
import { Grid } from '@material-ui/core';
import CampaignCard from './campaignCard';

function Pageination(props) {
    const EN = props.EN;

    React.useEffect(() => {
        function startup(){
            LoadCampaigns()  
        }
        startup();         
    }, []);

    async function LoadCampaigns(){
        await props.LoadCampaignsForPage(props.page)
    }

    if(props.loading){
        return(
            <div>
                <div className='cam-loader'>
                    <HashLoader
                        size={100}
                        color={"#ea8737"}
                        loading={true}
                        />
                </div>
                <section style={{height:"200px"}}>
                    
                </section>
            </div>
        )
    }else{
        return (
            <div>
                 <Grid container spacing={0} style={{alignContent:'center', alignItems:'flex-start'}}>
                        {props.campaigns.map((cam, i) => {
                            return (
                                <Grid item xs={12} sm={3} key={i}>
                                    <CampaignCard
                                        campaign={cam}
                                        language={EN ? "en" : "es"}
                                        amount={cam.raised + cam?.zelleRaised}
                                    />
                                </Grid>
                                )
                        })}
                    </Grid>
            </div>
        );
    }
}

export default Pageination;