import React, {useState} from 'react';
import HashLoader from "react-spinners/HashLoader";
import { Grid } from '@material-ui/core';
import CampaignCard from './campaignCard';

function Pageination(props) {

    const [camCount, setCamCount] = useState(0);
    const EN = props.EN;

    if(!props.hasLoaded){
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
                 <Grid container spacing={5} style={{alignContent:'center', alignItems:'flex-start'}}>
                        {props.currentItems.map((cam, i) => {
                            setCamCount(camCount+1)
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

                    <div style={{ textAlign: 'center' }}>
                        <p id='no-cam'>
                            {camCount === 0 ? EN ? 'No campaigns in this category' : 'No hay campañas en esta categoría.' : ''}
                        </p>
                    </div>
            </div>
        );
    }
}

export default Pageination;