import React, {useState} from "react";
import LanguageService from '../../../services/language';
import Author from '../../author';
import CampaignsVisuals from './CampaignsVisuals';
import "./Campaigns.css"
import api from '../../../services/api';

function Campaigns() {

    const [EN, setEN] = useState(false);
    const [hasLoaded, setHasLoaded] = useState(false);

    const [itemOffset, setItemOffset] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [campaigns, setCampaigns] = useState([]);
    const [filteredCampaigns, setFilteredCampaigns] = useState([]);
    const [currentItems, setCurrentItems] = useState([]);
    const NUM_OF_ITEMS_PER_PAGE = 8;

    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==="en");
            getAllCampaigns()            
        }
        startup();         
    }, []);

    async function getAllCampaigns(){
        console.log("HI")
        try {
            const res = await api.get('/campaigns/');
            const cams = res?.data?.data?.campaigns;
            setCampaigns(cams)
            setFilteredCampaigns(cams)
            setCurrentItems(cams.slice(itemOffset, NUM_OF_ITEMS_PER_PAGE))
            setPageCount(Math.ceil(cams?.length / NUM_OF_ITEMS_PER_PAGE))
            
        } catch (e) {
            console.log(e);
        }finally{
            setHasLoaded(true)
        }

    }

    return (
        <div className='campaigns-page'>
            <CampaignsVisuals 
                EN={EN} 
                hasLoaded={hasLoaded}
                campaigns = {campaigns}
                filteredCampaigns = {filteredCampaigns}
                currentItems = {currentItems}
                pageCount = {pageCount}
            />
            <Author />
        </div>
    );
}

export default Campaigns;