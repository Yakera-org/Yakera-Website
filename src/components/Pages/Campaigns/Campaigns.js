import React, {useState} from "react";
import LanguageService from '../../../services/language';
import Author from '../../author';
import CampaignsVisuals from './CampaignsVisuals';
import "./Campaigns.css"
import api from '../../../services/api';

const NUM_OF_ITEMS_PER_PAGE = 8;

function Campaigns() {

    const [EN, setEN] = useState(false);
    const [loading, setLoading] = useState(true);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCampaigns, setCurrentCampaigns] = useState([]);

    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==="en");       
        }
        startup();         
    }, []);

    async function LoadCampaignsForPage(page){
        setLoading(true)
        try {
            const res = await api.get(`/campaigns/?page=${page}&limit=${NUM_OF_ITEMS_PER_PAGE}&sort=desc`);
            let data = res.data
            console.log(data)
            setCurrentCampaigns(data.data.campaigns)
            setPageCount(data.pages)
            setCurrentPage(page)

        } catch (err) {
            console.log("Error: " + err)
        }finally{
            setLoading(false)
        }
       
    }

    return (
        <div className='campaigns-page'>
            <CampaignsVisuals 
                EN={EN} 
                loading={loading}
                campaigns = {currentCampaigns}
                page = {currentPage}
                pageCount = {pageCount}
                LoadCampaignsForPage={LoadCampaignsForPage}
            />
            <Author />
        </div>
    );
}

export default Campaigns;