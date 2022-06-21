import React, {useState} from "react";
import LanguageService from '../../../services/language';
import Author from '../../author';
import CampaignsVisuals from './CampaignsVisuals';
import "./Campaigns.css"
import api from '../../../services/api';

const NUM_OF_ITEMS_PER_PAGE = 8;
const INITIAL_ARGS= Object.freeze({
    page: 1,
    category: "",
    newCategory: true,
    dateOrder: "",
    filter:"",
    query:""
})

const staticStory ={
    "targetAmount": 3000,
    "country": "VE",
    "approved": true,
    "completed": false,
    "slug": "ayudame-a-lograr-mi-operacion",
    "_user": {
        "zelleInfo": {
            "email": "roman.reyes350@hotmail.com",
            "name": "Román Reyes ",
            "isAccepting": true
        },
        "firstName": "Ramón",
        "lastName": "Bravo"
    },
    "title": "Ayúdame a lograr mi operación.",
    "category": "healthcare",
    "description": "Operación de Próstata y Hernia inguinal derecha.",
    "story": "Mi nombre es Ramón Bravo, soy un docente retirado de 63 años pensionado del estado Venezolano. Vivo en la ciudad de Valencia en el centro del país con mi pareja Lisbeth Reyes. Nuestros hijos están fuera del país y su ayuda es muy precaria. Básicamente nos mantenemos con el trabajo eventual que conseguimos, clases privadas de inglés yo y mi pareja en su intento de venta de inmuebles. <br />Mi necesidad y por eso solicito su ayuda se debe a un excesivo crecimiento de mi próstata y por recomendación del urólogo debo operarme, aparte de una hernia inguinal que se encontró mientras se me hacían los chequeos prostáticos. Este crecimiento de la próstata me impide el acto de la micción de una manera normal e indolora como debe ser. <br />El grueso de los fondos que se recauden serán destinados al pago de la intervención quirúrgica, médicos, enfermeras, de los materiales quirúrgicos (instrumental) que se utilizarán en la misma, de las medicinas que se utilizarán durante la intervención, de los exámenes pre-operatorios y hasta del agua mineral que debo llevar (30 litros.) que la verdad no tengo idea de su uso. Igualmente parte de esta recaudación se usará para el proceso de recuperación post-operatorio, medicinas y consultas post-operatorias y la respectiva biopsia de los cuales aún no tengo precios.\n<br /><br />\nPago Movil: Ramón Bravo CI 5089751 04124413082 BANESCO",
    "itemizedBudget": "Procedimiento Quirúrgico : R.T.U. de Próstata + Hernia Inguinal Derecha.\nDescripción :\nCardiovascular pre-operatorio.\nLaboratorio.\nRayos X de Tórax (2 Proyecciones).\nHM Consulta preanestesia.\nIntervención Quirúrgica.\nMalla.\nGastos totales Intervención Quirúrgica : 2.505,00 Dólares.\n\nMedicinas a ser utilizadas durante la Intervención Quirúrgica : \nKetoprofeno 160 mg. 4 ampollas.\nSultanicilina Sulbutan 1.5 mg. 4 ampollas.\nCiclokapron 500 mg. 4 ampollas.\nSonda Cuvalier 3 vías de Silicona Nº 22-24 Marca RUSCH.\nAgua Mineral 5 lts. 6 botellone.\nGastos Totales Medicina pre-operatorio : 149,22 Dólares.\n\nGasto Total : 2.654,22 Dólares.\n\nNota : Aquí no se incluyen los gastos post-operatorios ni la biopsia ya que por el momento desconozco su monto.\n",
    "mainPicture": {
        "url": "https://assets.yakera.org/pictures/d2Km5gx7FuQeJjHueNd28J.jpeg"
    },
    "pictures": [
        {
            "url": "https://assets.yakera.org/files/tBauFZnXFQWPZ1kmEaxVe5.jpeg"
        },
        {
            "url": "https://assets.yakera.org/pictures/d2Km5gH7FuQeJjHueNd28J.jpeg"
        },
        {
            "url": "https://assets.yakera.org/files/nPKQJX1o6buaNYDc6bebau.jpeg"
        }
    ],
    "supportDocs": [
        {
            "url": "https://assets.yakera.org/pictures/4x7vyXR4H5Z7Xenknktwbk.jpeg"
        }
    ],
    "translations": {
        "en": {
            "title": "Help me get my operation",
            "description": "Operation for my prostate and a right inguinal hernia.",
            "story": "My name is Ramón Bravo, I am a 63-year-old retired teacher from Venezuela. I live in the city of Valencia in the center of the country with my partner Lisbeth Reyes. Our children are abroad and their help is very precarious. Basically we support ourselves with the temporary work we get, private English classes for me and my partner attempting to sell real estate. <br />My need for which I request your help is due to an excessive growth of my prostate and on the recommendation of the urologist I must have surgery, apart from an inguinal hernia that was found while I was undergoing prostate check-ups. This growth of the prostate prevents me from the act of urination in a normal and painless way as it should be.  <br />The bulk of the funds collected will be used to pay for the surgical intervention, doctors, nurses, the surgical materials (instruments) that will be used in it, the medicines that will be used during the intervention, the pre-operative exams and even the mineral water that I have to bring (30 litres.) I honestly have no idea how to use it. Likewise, part of this collection will be used for the post-operative recovery process, medicines and post-operative consultations and the respective biopsy for which I do not yet have prices.\n<br /><br />\nPago Movil: Ramón Bravo CI 5089751 04124413082 BANESCO"
        }
    },
    "updates": [],
    "donations": [
        {
            "amount": 20,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Beysi Montero",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 50,
            "tip": 0,
            "isP2P": true,
            "isAnonymous": false,
            "name": "ASDRUBAL GUILARTE",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 100,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Natacha Castellanos ",
            "status": "success",
            "comment": "Que todo salga bien"
        },
        {
            "amount": 500,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": true,
            "status": "success",
            "comment": ""
        },
        null,
        null,
        {
            "amount": 30,
            "tip": 1,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Maria Gomez",
            "status": "success",
            "comment": "Esperamos todo salga bien y te recuperes pronto .. Pepe y Concesa"
        },
        {
            "amount": 50,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Maria Castellanos",
            "status": "success",
            "comment": "Te deseamos una pronta recuperación."
        },
        {
            "amount": 50,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Gloria Arias",
            "status": "success",
            "comment": "Dios lo cuide profesor en su cirugía"
        },
        null,
        {
            "amount": 30,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Romi",
            "status": "success",
            "comment": ""
        },
        null,
        {
            "amount": 40,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": true,
            "status": "success",
            "comment": ""
        },
        {
            "amount": 150,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Korina Ravelo",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 30,
            "tip": 2,
            "isP2P": true,
            "isAnonymous": false,
            "name": "Kenia Quintero",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 30,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Andrea Castellanos",
            "status": "success",
            "comment": "Que todo salga bien, amen🙏🏽"
        },
        {
            "amount": 100,
            "tip": 2,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Ileana villarroel",
            "status": "success",
            "comment": "Dios es maravilloso"
        },
        {
            "amount": 50,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Juan Carpio",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 50,
            "tip": 0,
            "isP2P": false,
            "isAnonymous": false,
            "name": "Daniela Pestana",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 50,
            "tip": 0,
            "isP2P": true,
            "isAnonymous": false,
            "name": "Francisco Canton",
            "status": "success",
            "comment": ""
        },
        {
            "amount": 100,
            "tip": 0,
            "isP2P": true,
            "isAnonymous": false,
            "name": "Iván Rodríguez ",
            "status": "success",
            "comment": "Espero que todo te salga bien con la ayuda de Dios"
        }
    ],
    "createdAt": "2022-05-23T15:03:17.520Z",
    "updatedAt": "2022-05-23T15:03:17.520Z",
    "raised": 1200,
    "zelleRaised": 230,
    "percentage": 47.67,
    "created": "23/05/2022"
}

function Campaigns() {

    const [EN, setEN] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const [highlightStory, setHighlightStroy] = useState({});

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
            LoadCampaignsForPage({page:currentPage})    
        }
        startup();         
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function sendFilterNameToBackend(name){
        try {
            //await api.get(`/track?path=camaignFilter/${name}`);
        } catch (err) {
            console.log('Error. ' + err)
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

            setHighlightStroy(staticStory)

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
        await LoadCampaignsForPage({page:newPage+1}) // +1 is needed, as the pagination counts from 0
    }

    async function setSearch(){
        var loadArgs = Object.assign({}, INITIAL_ARGS)
        setCurrentCategory(INITIAL_ARGS.category)
        setCurrentFilter(INITIAL_ARGS.filter)
        loadArgs["query"] = currentSearchQuery
        await LoadCampaignsForPage(loadArgs)
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
            />
            <Author />
        </div>
    );
}

export default Campaigns;