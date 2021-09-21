import React from 'react';
import { Grid } from '@material-ui/core';
import Carousel from 'react-multi-carousel';
import api from "../../../services/api";
import CampaignCard from '../Donate/campaignCard';
import tempCams from '../Donate/allCampaigns';
import pics from '../Donate/pics'
import icons from '../Donate/icons'
import './home.scss';

const colorDic={
    "education": '#71b98f',
    "healthcare": '#ff7d7d',
    "business":'#7099d0',
    "nutrition": '#ffc19a',
};


//for carousel 
const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

function CampaignCarousel(props) {

    React.useEffect(() =>{
        localStorage.setItem('dic', null);
        getCampaigns();
    }, [])

    const [loaded, setLoaded] = React.useState(false);
    const [campaigns, setCampaigns] = React.useState({});


    async function getCampaigns() {
        try {
            const res = await api.get('/campaigns');
            setCampaigns(res.data.data.campaigns)
            setLoaded(true);
        } catch (err) {
            setLoaded(true);
        }
    }

    if(!loaded){
        return(
            <p>Loading...</p>
        )
    }else{    
        return (
            <Grid container spacing={0}>                    
                <Grid item xs={12} sm={12} >
                    <h1>
                        Extiende una mano
                    </h1>                           
                </Grid>  
                <Grid item xs={12} sm={12} className='carousel'>                            
                    <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={true}
                        autoPlaySpeed={5000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={''}
                        deviceType={"mobile"}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                    >    
                    {/* {
                        campaigns.map(cam => {
                            return(
                               <p>Campaign here</p>
                            )                           
                        })
                    } */}
                    {tempCams.map((cam, i) => {
                            return(
                                <div id='card-container'>
                                    <CampaignCard
                                        campaign={cam.cam}
                                        color={colorDic[cam.cam.category]}
                                        language={'sp'}
                                        logo={pics[cam.cam.category]}  // make this pass the whole thing
                                        amount={200}
                                        icon={icons[cam.cam.category]}
                                    />
                                </div>
                            )                       
                    })}  
                    </Carousel>             
                </Grid>  
            </Grid>
        );
    }
}

export default CampaignCarousel;