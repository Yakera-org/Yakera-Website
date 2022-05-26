import React, {useState} from "react";
import LanguageService from '../../../services/language';
import Author from '../../author';
import CampaignsVisuals from './CampaignsVisuals';
import "./Campaigns.css"
import api from '../../../services/api';

const NUM_OF_ITEMS_PER_PAGE = 8;
const INITIAL_ARGS={
    page: 1,
    category: "",
    newCategory: true,
    dateOrder: "",
    filter:""
}
function Campaigns() {

    const [EN, setEN] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [pageCount, setPageCount] = useState(0);
    const [currentCampaigns, setCurrentCampaigns] = useState([]);

    const [dateOrder, setDateOrder] = useState(INITIAL_ARGS.dateOrder);
    const [currentPage, setCurrentPage] = useState(INITIAL_ARGS.page);
    const [currentCategory, setCurrentCategory] = useState(INITIAL_ARGS.category);
    const [currentFilter, setCurrentFilter] = useState(INITIAL_ARGS.filter);


    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==="en");   
            LoadCampaignsForPage({page:currentPage})    
        }
        startup();         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function LoadCampaignsForPage(args){
        //the role of this function is to assign the arguments for correct use in the backend call
        const _args = assignArgs(args)
        const page = _args[0]
        const category = _args[1]
        const newCat = _args[2]
        const date = _args[3]
        const filter = _args[4]
        await LoadCampaignsFromBackend(page, category, newCat, date, filter) // single point of backend connection
    }

    function assignArgs(args){
        let finalArgs = Object.assign(
            {
                page: 1,
                category: currentCategory,
                newCat: false,
                dateOrder: dateOrder,
                filter: currentFilter
            },
            args);

        return [finalArgs.page, finalArgs.category, finalArgs.newCat, finalArgs.dateOrder, finalArgs.filter]
    }

    //only function that calls to the backend
    async function LoadCampaignsFromBackend(page, category, isNewCat, dateOrder, filter){
        setLoading(true)
        const pageLimit = getPageLimit(filter)
        try {
            let newPageNum = isNewCat ? 1 : page

            const payload = `/campaigns/?${pageLimit ? `page=${newPageNum}` : ""}${pageLimit ? `&limit=${pageLimit}`: ""}${filter === "percent" ? `&percentage=desc`: ""}${filter === "raised" ? `&raised=desc`: ""}${filter === "date" ? `&sort=${dateOrder}`: ""}${filter === "" ? `&sort=desc`: ""}${category? `&category=${category}`: ""}` //has to be one line string
            
            const res = await api.get(payload);
            let data = res.data

            const totalPages = getPageNum(data, filter)
            const currentCampaigns = getCampaigns(data, filter, newPageNum)
            setPageCount(totalPages)
            setCurrentCampaigns(currentCampaigns)
            setCurrentPage(newPageNum)

        } catch (err) {
            console.log("Error: " + err)
        }finally{
            setLoading(false)
        }       
    }

    function getCampaigns(data, filter, page){
        const allCampaigns = data.data.campaigns
        if(filter!=="percent" && filter !== "raised")return allCampaigns //already paginated
        const _currentPage = page-1
        const campaignExtract = allCampaigns.slice(NUM_OF_ITEMS_PER_PAGE * _currentPage, NUM_OF_ITEMS_PER_PAGE*(_currentPage+1))
        return campaignExtract
    }

    function getPageNum(data, filter){
        if(filter!=="percent" && filter !== "raised")return data.pages //backend already returns total number of pages
        const camNum = data.data.campaigns.length
        const pageNum = Math.ceil(camNum / NUM_OF_ITEMS_PER_PAGE)
        return pageNum
    }

    function getPageLimit(filter){
        return (filter === "percent" || filter === "raised") ? "" : NUM_OF_ITEMS_PER_PAGE
    }

    async function setCategory(e){
        var isSameCat = e.target.name === currentCategory // true if same
        var newCategory = isSameCat ? "" : e.target.name //turn "off" category if selected again
        var _currentPage = isSameCat ? currentPage : INITIAL_ARGS.page // go to page 1 if new category
        setCurrentCategory(newCategory)

        var loadArgs = {
            page: _currentPage,
            category: newCategory,
            newCategory: true
        }
        await LoadCampaignsForPage(loadArgs)
    }

    async function setFilter(e){
        var newFilter = getNewFilter(e.target.getAttribute('name'))
        var _dateOrder = getDateOrder(newFilter)

        setCurrentFilter(newFilter)
        setDateOrder(_dateOrder)

        var loadArgs = {
            newCategory: true,
            dateOrder: _dateOrder,
            filter: newFilter
        }

        if(newFilter==="reset") loadArgs = resetArgs()
        
        await LoadCampaignsForPage(loadArgs)
    }
    
    function resetArgs(){
        setCurrentCategory("")
        setCurrentFilter("")
        return INITIAL_ARGS
    }

    function getDateOrder(filter){
        //flipflop date order
        let order = dateOrder === "asc" ? "desc" : "asc"
        return (filter === "date") ? order : "" //only for "date" filter   
    }

    function getNewFilter(filter){
        //turn off current filter if active filter is selected (except for date)
        let isSameFilter = filter === currentFilter && filter !== "date"
        return isSameFilter ? "" : filter
    }

    async function setPage(newPage){        
        await LoadCampaignsForPage({page:newPage+1}) // +1 is needed, as the pagination counts from 0
    }

    return (
        <div className='campaigns-page'>
            <CampaignsVisuals 
                EN={EN} 
                loading={loading}
                campaigns = {currentCampaigns}
                page = {currentPage}
                pageCount = {pageCount}
                setPage={setPage}
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