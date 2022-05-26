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
    
    const [dateOrder, setDateOrder] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCategory, setCurrentCategory] = useState("");
    const [currentCampaigns, setCurrentCampaigns] = useState([]);
    const [currentFilter, setCurrentFilter] = useState("");


    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==="en");   
            LoadCampaignsForPage(currentPage)    
        }
        startup();         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function LoadCampaignsForPage(page, category = currentCategory, newCat = false, date = dateOrder, filter = currentFilter){
        setLoading(true)
        try {
            let newPageNum = page
            if(newCat) newPageNum = 1
            const payload = `/campaigns/?
                page=${newPageNum}
                &limit=${NUM_OF_ITEMS_PER_PAGE}
                ${filter === "percent" ? `&percentage=desc`: ""}
                ${filter === "raised" ? `&raised=desc`: ""}
                ${filter === "date" ? `&sort=${date}`: ""}                
                ${filter === "" ? `&sort=desc`: ""}                
                ${category? `&category=${category}`: ""}
            `
            console.log(payload)
            const res = await api.get(payload);
            let data = res.data
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

    async function setFilter(e){
        var newFilter = getNewFilter(e.target.getAttribute('name'))
        var date = getDateOrder(newFilter)

        setCurrentFilter(newFilter)
        setDateOrder(date)

        await LoadCampaignsForPage(currentPage, currentCategory, true, date, newFilter)
    }

    function getDateOrder(filter){
        if(filter === "date"){
            //flipflop date order
            return dateOrder === "asc" ? "desc" : "asc"
        }else{
            return ""
        }
    }
    function getNewFilter(filter){
        //turn off current filter if active filter is selected (except for date)
        if(filter===currentFilter && filter !== "date"){
            return ""
        }else{
            return filter
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
                setCategory={setCategory}
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