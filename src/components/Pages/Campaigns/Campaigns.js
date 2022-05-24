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
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentCampaigns, setCurrentCampaigns] = useState([]);
    const [dateOrder, setDateOrder] = useState("asc");
    const [currentFilter, setCurrentFilter] = useState("");

    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==="en");       
        }
        startup();         
    }, []);

    async function LoadCampaignsForPage(page, category = currentCategory, newCat = false, date = dateOrder){
        setLoading(true)
        try {
            let newPageNum = page
            if(newCat) newPageNum = 1
            const res = await api.get(`/campaigns/?page=${newPageNum}&limit=${NUM_OF_ITEMS_PER_PAGE}&sort=${date}${category? `&category=${category}`: ""}`);
            let data = res.data
            console.log(data)
            setCurrentCampaigns(data.data.campaigns)
            setPageCount(data.pages)
            setCurrentPage(newPageNum)

        } catch (err) {
            console.log("Error: " + err)
        }finally{
            setLoading(false)
        }
       
    }

    async function setCategory(e){
        var newCategory = e.target.name
        if(newCategory===currentCategory)newCategory=""
        setCurrentCategory(newCategory)
        await LoadCampaignsForPage(currentPage, newCategory, true)
    }

    async function reverseDateOrder(){
        const newDate = dateOrder==="asc" ? "desc" : "asc"
        setDateOrder(newDate)
        await LoadCampaignsForPage(currentPage, currentCategory, true, newDate)
    }

    async function setFilter(e){
        setCurrentFilter(e.target.getAttribute('name'))
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
                setCategory={setCategory}
                reverseDateOrder={reverseDateOrder}
                dateOrder={dateOrder}
                currentCategory={currentCategory}
                currentFilter={currentFilter}
                setFilter={setFilter}
            />
            <Author />
        </div>
    );
}

export default Campaigns;