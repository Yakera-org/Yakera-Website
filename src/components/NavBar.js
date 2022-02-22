import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ReactCountryFlag from "react-country-flag";
import Switch from "react-switch";
import logo from "../svg/logo.svg";
import '../App.css';
import api from "../services/api";
import TokenService from "../services/token";
import LanguageService from "../services/language";



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            currentTab: '',
            token: '',
            isRecipient: true,
            checked: true,
            language: 'en',
            loaded: false,
            navHeight: 150,
            EN: true
        }
    }

    componentDidMount() {
        //setting language
        var lang = LanguageService.getLanguage()

        if(lang === 'en'){
            this.setState({
                checked:true, // true is US
                EN: true
            })
        }else{
            this.setState({
                checked:false, //false is VE
                EN: false
            })
        }

        var currentTab = localStorage.getItem('currentTab');
        var token = TokenService.getLocalAccessToken();
        var isRec = true;

        if(TokenService.isDonor()){
            isRec = false
        }

        this.setState({
            token:token,
            language: lang,
            currentTab: currentTab,
            loaded: true,
            isRecipient: isRec
        })
    }

    // toggles for mobile, increases size so the dropdown adapts
    handleToggle(){
        var height = 500
        if(this.state.navHeight === 500){ //readjust if closed
            height = 150
        }
        this.setState({
            navHeight: height
        })
    }

    onChange(){
        LanguageService.setLanguage()
        window.location.reload(false);
    }

    onTabClick(event){
        let name = event.target.getAttribute('name')
        this.setState({
            currentTab:name
        })

        localStorage.setItem("currentTab", name)
        window.location.href = "/"+ name;
    }
    onHomeClick(){
        localStorage.setItem("currentTab", '')
    }

    async onLogOut(){
        try{
            await api.post('/auth/logout');
            window.alert('User logged out successfully!')
            TokenService.removeAccessToken();
            TokenService.removeRefreshToken();
            localStorage.removeItem("userType");
            localStorage.removeItem("email")
            localStorage.removeItem("name")
            localStorage.setItem('currentTab', 'home')
            window.location.href = "/";
        }catch(err){
            console.log('error: ' + err);
            TokenService.removeAccessToken();
            TokenService.removeRefreshToken();
            localStorage.removeItem("userType");
            localStorage.removeItem("name")
            localStorage.removeItem("email")
            localStorage.setItem('currentTab', 'home')
            window.location.href = "/";
        }
    }



    render(){
        var EN = this.state.EN
        var isRecipient = this.state.isRecipient
        var isAuthenticated = false;

        if(this.state.token)isAuthenticated = true

        if(!this.state.loaded){
            return(
                <p>loading</p>
            )
        }else{
            return(
                <div>
                    <Navbar id='navbar' style={{height: this.state.navHeight + 'px'}} inverse="true" collapseOnSelect fixed="top" className='nav-bar' bg='white' variant="dark" expand= "xl"
                        onToggle={this.handleToggle}>

                    <Navbar.Brand onClick={this.onHomeClick.bind(this)} >
                        <a href="/"><div><object id='nav-brand' data={logo} > </object></div></a>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{marginBottom:'10px'}}>
                        <FontAwesomeIcon
                            icon={faBars} color="#0e325e" size="2x"
                        />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">

                            <Nav.Link 
                                id={this.state.currentTab === 'about' ? 'nav-tab-selected': 'nav-tab'}  
                                name='about' 
                                onClick={this.onTabClick.bind(this)}
                                >
                                    {EN 
                                    ?
                                    'ABOUT US'
                                    :
                                    <div name='about' className = "nav-spanish-text">SOBRE NOSOTROS</div>
                                    }
                            </Nav.Link>

                            <Nav.Link 
                                id={this.state.currentTab === 'support' ? 'nav-tab-selected': 'nav-tab'} 
                                name='support'  
                                onClick={this.onTabClick.bind(this)}
                                > 
                                    {EN 
                                    ?
                                    'SUPPORT US'
                                    :
                                    <div name='support' className = "nav-spanish-text">APÓYANOS </div>
                                    }
                            </Nav.Link>

                            <Nav.Link 
                                id={this.state.currentTab === 'campaigns' ? 'nav-tab-selected': 'nav-tab'} 
                                name='campaigns'  
                                onClick={this.onTabClick.bind(this)}
                                > 
                                    {EN
                                    ?
                                    'CAMPAIGNS'
                                    :
                                    <div name='campaigns' className = "nav-spanish-text">CAMPAÑAS</div>
                                    }
                            </Nav.Link>

                            <Nav.Link 
                                id={this.state.currentTab === 'frequently-asked-questions' ? 'nav-tab-selected': 'nav-tab'} 
                                name='frequently-asked-questions'  
                                onClick={this.onTabClick.bind(this)}
                                >
                                    {EN 
                                    ?
                                    'FAQ'
                                    :
                                    <div name='frequently-asked-questions' className = "nav-spanish-text">PREGUNTAS</div>
                                    }
                            </Nav.Link>

                            <Nav.Link 
                                id={this.state.currentTab === (isAuthenticated ? isRecipient ? 'dashboard' : 'donor-hub' : 'login') ? 'nav-tab-selected': 'nav-tab'} 
                                name={isAuthenticated ? isRecipient ? 'dashboard' : 'donor-hub' : 'login'}  
                                onClick={this.onTabClick.bind(this)}
                                >
                                    {isAuthenticated 
                                    ? 
                                        isRecipient
                                        ?
                                            EN
                                            ? 
                                            'DASHBOARD'
                                            :
                                            <div 
                                                name='dashboard'
                                                className = "nav-spanish-text"
                                            >
                                                MI CUENTA
                                            </div>
                                        :
                                            EN
                                            ? 
                                            'DONOR HUB'
                                            :
                                            <div 
                                                name='donor-hub'
                                                className = "nav-spanish-text"
                                            >
                                                DONOR HUB
                                            </div>
                                    :
                                        EN 
                                        ?
                                        'LOG IN'
                                        :
                                        <div 
                                            name='login'
                                            className = "nav-spanish-text"
                                        >
                                            INICIAR SESIÓN
                                        </div>
                                    }
                            </Nav.Link>

                            { isAuthenticated
                            ?
                                <Nav.Link >
                                <div className='logout-mobile' onClick={this.onLogOut.bind(this)}   >
                                    <i className="fas fa-sign-out-alt"></i><label>&nbsp;{EN ? 'SIGN OUT' : 'CERRAR SESIÓN'}</label>
                                </div>
                            </Nav.Link>
                            :
                            ''
                            }
                            <div style={{marginLeft:'25px', marginTop:'-5px'}}>
                                <Switch
                                onChange={this.onChange}
                                checked={this.state.checked}
                                handleDiameter={20}
                                offColor="#eeeeee"
                                onColor="#eeeeee"
                                offHandleColor="#01224d"
                                onHandleColor="#01224d"
                                height={50}
                                width={100}
                                borderRadius={10}
                                uncheckedIcon={
                                    <div>
                                    <ReactCountryFlag
                                            countryCode="VE"
                                            svg
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                borderRadius:'15px',
                                                paddingLeft:'5px'
                                            }}
                                            title="VE"
                                        />
                                    </div>
                                }
                                checkedIcon={
                                    <ReactCountryFlag
                                        countryCode="US"
                                        svg
                                        style={{
                                            width: '50px',
                                            height: '50px',
                                            borderRadius:'15px',
                                            paddingLeft:'5px'
                                        }}
                                        title="US"
                                    />
                                }

                                />
                            </div>
                        </Nav>

                    </Navbar.Collapse>
                    { isAuthenticated
                        ?
                        <div className='logout' onClick={this.onLogOut.bind(this)}>
                            <i className="fas fa-sign-out-alt"></i><label>&nbsp;{EN ? 'SIGN OUT' : 'CERRAR SESIÓN'}</label>
                        </div>
                        :
                        ''
                    }

                    </Navbar>
                </div>
            )
        }
    }
}

export default NavBar;
