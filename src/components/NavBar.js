import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
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
            checked: true,
            language: 'en',
            loaded: false
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
        this.setState({
            loaded: true
        }) 
    }

    handleToggle(){
        
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

        
    render(){
        var EN = true //is english
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
                    <Navbar id='navbar' inverse="true" collapseOnSelect fixed="top" className='nav-bar' bg='white' variant="dark" expand="lg"
                        onToggle={this.handleToggle}>

                    <Navbar.Brand >
                        <a href="/"><div><object id='nav-brand' data={logo} > </object></div></a>
                    </Navbar.Brand>
                    <Navbar.Toggle>
                        <FontAwesomeIcon
                            icon={faBars} color="#0e325e" size="2x" 
                        />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link id='nav-tab' href="/info" > ABOUT US</Nav.Link>
                        <Nav.Link href="/donate" id='nav-tab' > {EN ? 'DONATE' : 'DONAR'}</Nav.Link>
                        <Nav.Link href="/campaigns" id='nav-tab'> {EN ? 'CAMPAIGNS' : 'Campañas'}</Nav.Link>
                        <Nav.Link href="/faq" id='nav-tab'>FAQ</Nav.Link>
                        {/* <Nav.Link href="/profile" style={{fontSize:'30px'}}>Profile</Nav.Link>
                        <Nav.Link href="/login" style={{fontSize:'30px'}}>Log-in</Nav.Link> */}
                        <div style={{marginLeft:'50px', marginTop:'-5px'}}>
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
                    
                    </Navbar>               
                </div>
            )
        }
    }
}

export default NavBar;