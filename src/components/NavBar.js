import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import * as axios from 'axios';
import ReactCountryFlag from "react-country-flag";
import Switch from "react-switch";
import logo from "../svg/logo.svg";
import '../App.css';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            currentTab: '',
            token: '',
            checked: true,
            language: 'en',
            loaded: false,
            navHeight: 150,
        }
    }

    componentDidMount() {
        //setting language
        var lang = localStorage.getItem("lang");
        if(lang){
            this.setState({
                language: lang
            })
        }else{
            localStorage.setItem("lang", this.state.language);
        }
        
        if(lang === 'en'){
            this.setState({
                checked:true // true is US
            })
        }else{
            this.setState({
                checked:false //false is VE
            })
        }

        var currentTab = localStorage.getItem('currentTab')
        var token = localStorage.getItem('user')

        this.setState({
            token:token,
            currentTab: currentTab,
            loaded: true
        }) 
    }

    // toggles for mobile, increases size so the dropdown adapts
    handleToggle(){
        var height = 500
        if(this.state.navHeight === 500){ //readjust if closed
            height = 150
        }

        //set state
        this.setState({
            navHeight: height
        })

    }

    onChange(){
        this.setState({
            checked: !this.state.checked
        })
        if(this.state.language=== 'en'){
            localStorage.setItem("lang", 'sp');
        }else{
            localStorage.setItem("lang", 'en');
        }
        window.location.reload(false);
    }

    onTabClick(event){
        let name = event.target.name
        this.setState({
            currentTab:name
        })
        console.log(name)
        localStorage.setItem("currentTab", name)
        window.location.href = "/"+name;
    }
    onHomeClick(){
        localStorage.setItem("currentTab", '')        
    }

    async onLogOut(){
        const backendUrl = 'https://express-backend-api.herokuapp.com/';
        const url = backendUrl + 'api/auth/logout';
        const token = localStorage.getItem('user');
        localStorage.removeItem('user')
        localStorage.setItem('currentTab', 'home')
        window.alert('User logged out successfully!')
        window.location.href = "/";
        console.log(token)
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        try{
            await axios.post(url, {}, config);
            console.log('logged out')
        }catch(err){
            console.log('error: ' + err)
        }
    }


        
    render(){
        var EN = true //is english
        var isAuthenticated = false;

        if(this.state.token)isAuthenticated = true
        
        if(this.state.language === 'en'){
            EN = true
        }else{
            EN = false
        }

        if(!this.state.loaded){
            return(
                <p>loading</p>
            )
        }else{
            return( 
                <div>
                    <Navbar id='navbar' style={{height: this.state.navHeight + 'px'}} inverse="true" collapseOnSelect fixed="top" className='nav-bar' bg='white' variant="dark" expand="lg"
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
                        <Nav.Link id={this.state.currentTab === 'about' ? 'nav-tab-selected': 'nav-tab'}  name='about' onClick={this.onTabClick.bind(this)} >ABOUT US</Nav.Link>
                        <Nav.Link id={this.state.currentTab === 'support' ? 'nav-tab-selected': 'nav-tab'} name='support'  onClick={this.onTabClick.bind(this)}> {EN ? 'SUPPORT US' : 'DONAR'}</Nav.Link>
                        <Nav.Link id={this.state.currentTab === 'campaigns' ? 'nav-tab-selected': 'nav-tab'} name='campaigns'  onClick={this.onTabClick.bind(this)}> {EN ? 'CAMPAIGNS' : 'Campañas'}</Nav.Link>
                        <Nav.Link id={this.state.currentTab === 'frequently-asked-questions' ? 'nav-tab-selected': 'nav-tab'} name='frequently-asked-questions'  onClick={this.onTabClick.bind(this)}>FAQ</Nav.Link>
                        <Nav.Link id={this.state.currentTab === (isAuthenticated ? 'dashboard' : 'login') ? 'nav-tab-selected': 'nav-tab'} name={isAuthenticated ? 'dashboard' : 'login'}  onClick={this.onTabClick.bind(this)}>{isAuthenticated ? 'DASHBOARD' : 'LOGIN'}</Nav.Link>
                        { isAuthenticated
                        ?
                            <Nav.Link >
                            <div className='logout-mobile' onClick={this.onLogOut.bind(this)}   >
                                <i className="fas fa-sign-out-alt"></i><label>&nbsp;SIGN OUT</label>
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
                            <i className="fas fa-sign-out-alt"></i><label>&nbsp;Sign out</label>
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