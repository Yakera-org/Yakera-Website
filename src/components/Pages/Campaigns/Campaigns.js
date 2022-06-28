import React, {useState} from "react";
import LanguageService from '../../../services/language';
import Author from '../../author';
import CampaignsVisuals from './CampaignsVisuals';
import "./Campaigns.css"
import api from '../../../services/api';
import * as dictionaries from "./dictionaries"

const NUM_OF_ITEMS_PER_PAGE = 4;
const INITIAL_ARGS= Object.freeze({
    page: 1,
    category: "",
    newCategory: true,
    dateOrder: "",
    filter:"",
    query:""
})

function Campaigns() {

    const [EN, setEN] = useState(false);
    const [loading, setLoading] = useState(true);
    const [loadingHighlight, setLoadingHighlight] = useState(true);
    
    const [highlightStory, setHighlightStory] = useState({});

    const [pageCount, setPageCount] = useState(0);
    const [currentCampaigns, setCurrentCampaigns] = useState([]);

    const [dateOrder, setDateOrder] = useState(INITIAL_ARGS.dateOrder);
    const [currentPage, setCurrentPage] = useState(INITIAL_ARGS.page);
    const [currentCategory, setCurrentCategory] = useState(INITIAL_ARGS.category);
    const [currentFilter, setCurrentFilter] = useState(INITIAL_ARGS.filter);
    const [currentSearchQuery, setCurrentSearchQuery] = useState(INITIAL_ARGS.query);


    React.useEffect(() => {
        function startup(){
            setEN(LanguageService.getLanguage()==="en"); 
            getHighlightedCampaign()   
            LoadCampaignsForPage({page:currentPage})
        }
        startup();         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function scrollToTop(){
        window.scrollTo({ top: 900, behavior: 'smooth' });
    }

    async function getHighlightedCampaign(){
        try {
            const highlight = await api.get(`/campaigns/top/campaign`);
            setHighlightStory(highlight.data.campaign)
        } catch (err) {
            console.error('Error. ' + err)
            setHighlightStory(dictionaries.staticStory)
        } finally{
            setLoadingHighlight(false)
        }
    }

    async function sendFilterNameToBackend(name){
        try {
            //await api.get(`/track?path=camaignFilter/${name}`);
        } catch (err) {
            console.error('Error. ' + err)
        }
    }

    async function LoadCampaignsForPage(args){
        //the role of this function is to assign the arguments for correct use in the backend call
        const _args = assignArgs(args)
        const page = _args[0]
        const category = _args[1]
        const newCat = _args[2]
        const date = _args[3]
        const filter = _args[4]
        const query = _args[5]
        await LoadCampaignsFromBackend(page, category, newCat, date, filter, query) // single point of backend connection
    }

    function assignArgs(args){
        let finalArgs = Object.assign(
            {
                page: INITIAL_ARGS.page,
                category: currentCategory,
                newCat: false,
                dateOrder: dateOrder,
                filter: currentFilter,
                query: INITIAL_ARGS.query
            },
            args);

        return [finalArgs.page, finalArgs.category, finalArgs.newCat, finalArgs.dateOrder, finalArgs.filter, finalArgs.query]
    }

    //only function that calls to the backend
    async function LoadCampaignsFromBackend(page, category, isNewCat, dateOrder, filter, query){
        setLoading(true)
        const pageLimit = getPageLimit(filter, query)
        try {
            let newPageNum = isNewCat ? 1 : page

            const payload = `/campaigns/?${pageLimit ? `page=${newPageNum}` : ""}${pageLimit ? `&limit=${pageLimit}`: ""}${filter === "percent" ? `&percentage=desc`: ""}${filter === "raised" ? `&raised=desc`: ""}${filter === "date" ? `&sort=${dateOrder}`: ""}${filter === "" ? `&sort=desc`: ""}${category? `&category=${category}`: ""}` //has to be one line string
            
            const res = await api.get(payload);
            let data = res.data

            const totalPages = getPageNum(data, filter, query)
            const currentCampaigns = getCampaigns(data, filter, newPageNum, query)
            setPageCount(totalPages)
            setCurrentCampaigns(currentCampaigns)
            setCurrentPage(newPageNum)

        } catch (err) {
            console.log("Error: " + err)
        }finally{
            setLoading(false)
        }       
    }

    function getCampaigns(data, filter, page, query){
        const allCampaigns = data.data.campaigns
        const extractedCampaigns = !query ? allCampaigns : extractCampaigns(allCampaigns, query)
        if(filter!=="percent" && filter !== "raised" && !query)return extractedCampaigns //already paginated
        const _currentPage = page-1
        const campaignExtract = extractedCampaigns.slice(NUM_OF_ITEMS_PER_PAGE * _currentPage, NUM_OF_ITEMS_PER_PAGE*(_currentPage+1))
        return campaignExtract
    }

    function extractCampaigns(campaigns, query){
        var filteredCampaigns = campaigns.filter((campaign) => {
                let campaignTitles = campaign.translations["en"] ? campaign.translations["en"].title.toLowerCase() : ""
                campaignTitles += campaign.translations["es"] ? campaign.translations["es"].title.toLowerCase() : ""
                campaignTitles += " " + campaign.title.toLowerCase(); // add translated language title

                return campaignTitles.includes(query.toLowerCase());
            });

        return filteredCampaigns
    }  

    function getPageNum(data, filter, query){
        if(filter!=="percent" && filter !== "raised" && !query)return data.pages //backend already returns total number of pages
        const camNum = !query ? data.data.campaigns.length : extractCampaigns(data.data.campaigns, query).length
        const pageNum = Math.ceil(camNum / NUM_OF_ITEMS_PER_PAGE)
        return pageNum
    }

    function getPageLimit(filter, query){
        return (filter === "percent" || filter === "raised" || query) ? "" : NUM_OF_ITEMS_PER_PAGE
    }

    async function setCategory(e){
        const name = e.target.name
        var isSameCat = name === currentCategory // true if same
        var newCategory = isSameCat ? "" : name //turn "off" category if selected again
        var _currentPage = isSameCat ? currentPage : INITIAL_ARGS.page // go to page 1 if new category
        setCurrentCategory(newCategory)
        setCurrentSearchQuery(INITIAL_ARGS.query)

        await sendFilterNameToBackend(name)

        var loadArgs = {
            page: _currentPage,
            category: newCategory,
            newCategory: true
        }
        await LoadCampaignsForPage(loadArgs)
        scrollToTop()
    }

    async function setFilter(e){
        let name = e.target.getAttribute('name')
        await sendFilterNameToBackend(name)
        var newFilter = getNewFilter(name)
        var _dateOrder = getDateOrder(newFilter)

        setCurrentSearchQuery(INITIAL_ARGS.query)
        setCurrentFilter(newFilter)
        setDateOrder(_dateOrder)

        var loadArgs = {
            newCategory: true,
            dateOrder: _dateOrder,
            filter: newFilter
        }

        if(newFilter==="reset") loadArgs = resetArgs()

        await LoadCampaignsForPage(loadArgs)
        scrollToTop()
    }
    
    function resetArgs(){
        setCurrentCategory(INITIAL_ARGS.category)
        setCurrentFilter(INITIAL_ARGS.filter)
        setCurrentSearchQuery(INITIAL_ARGS.query)
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
        scrollToTop()
        await LoadCampaignsForPage({page:newPage+1}) // +1 is needed, as the pagination counts from 0
    }

    async function setSearch(){
        var loadArgs = Object.assign({}, INITIAL_ARGS)
        setCurrentCategory(INITIAL_ARGS.category)
        setCurrentFilter(INITIAL_ARGS.filter)
        loadArgs["query"] = currentSearchQuery
        await LoadCampaignsForPage(loadArgs)
        scrollToTop()
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
                setSearch={setSearch}
                currentSearchQuery={currentSearchQuery}
                setCurrentSearchQuery={setCurrentSearchQuery}
                highlightStory={highlightStory}
                loadingHighlight={loadingHighlight}
            />
            <Author />
        </div>
    );
}

export default Campaigns;