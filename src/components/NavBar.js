import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import ReactCountryFlag from "react-country-flag";
import Switch from "react-switch";
import landingPic from '../pics/landingPic.jpg'

import '../App.css';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            bgColor : 'blue',
            navSize : '50%',
            opacity: 1,
            displayImg: '',
            brandSize: 50,
            fontSize: 30,
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

        //navbar sizings
        if (typeof window !== "undefined") {
            window.onscroll = () => {
            let currentScrollPos = 500 - window.pageYOffset;

            this.setState({ opacity: currentScrollPos / 200 })
            
            }
        }

        if(window.location.pathname === '/'){
            if(window.matchMedia('(max-width: 600px)').matches){
                this.setState({
                    bgColor: 'transparent',
                    navSize: '10%',
                    displayImg: '',
                    brandSize: 50,
                    fontSize: 20
                })
            }else{
                this.setState({
                    bgColor: 'transparent',
                    navSize: '50%',
                    displayImg: '',
                    brandSize: 90,
                    fontSize: 30
                })
            }
        }else if(window.location.pathname === '/donate' || window.location.pathname === '/info'){
           if(window.matchMedia('(max-width: 600px)').matches){
               this.setState({
                   bgColor: 'transparent',
                   navSize: '10%',
                   displayImg: 'none',
                   brandSize: 40,
                   fontSize: 20
               })
           }else{
                this.setState({
                    bgColor:'transparent',
                    navSize: '15%',
                    displayImg: 'none',
                    brandSize: 50,
                    fontSize: 30
            })
           }

        }
        else{
            this.setState({
                bgColor:'blue',
                navSize: '15%',
                displayImg: 'none',
                brandSize: 40,
                fontSize: 30
            })
        };         
        }

    handleToggle(){
        let currentNavSize = this.state.navSize;

        if(window.location.pathname === '/donate' || window.location.pathname === '/info'){
            if(this.state.bgColor === 'transparent'){
                this.setState({
                    bgColor: 'darkred',
                    navSize: '55%',
                    displayImg: 'none',
                    brandSize: 40,
                    fontSize: 20
                })
            }else{
                this.setState({
                    bgColor: 'transparent',
                    navSize: '10%',
                    displayImg: 'none',
                    brandSize: 40,
                    fontSize: 30
                })
            }
        }
        if(window.location.pathname === '/'){
            if(this.state.bgColor === 'transparent'){
                this.setState({
                    bgColor: 'beige',
                    navSize: '55%',
                    displayImg: 'none',
                    brandSize: 40,
                    fontSize: 20
                })
            }else{
                this.setState({
                    bgColor: 'transparent',
                    navSize: '10%',
                    displayImg: '',
                    brandSize: 50,
                    fontSize: 30
                })
            }
        }
        if(window.location.pathname !== '/' || window.location.pathname !== '/donate' || window.location.pathname !== '/info'){
            this.setState({
                fontSize: 20
            })
        }
        if(currentNavSize === '15%'){
            this.setState({
                navSize: '55%'
            });
        }else if(currentNavSize === '55%'){
            this.setState({
                navSize: '15%'
            });
        } 
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
                    <Navbar  inverse="true" collapseOnSelect fixed="top" className='nav-bar' bg={this.state.bgColor} variant="dark" expand="sm"
                        onToggle={this.handleToggle}
                    style={{height:this.state.navSize, position:'absolute'}}>

                    <Navbar.Brand style={{fontSize:this.state.brandSize+'px'}} href="/">Yakera</Navbar.Brand>
                    <Navbar.Toggle>
                        <FontAwesomeIcon
                            icon={faBars} color="white" size="2x" 
                        />
                    </Navbar.Toggle>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href="/info" style={{fontSize: this.state.fontSize + 'px'}}>Info</Nav.Link>
                        <Nav.Link href="/donate" style={{fontSize: this.state.fontSize + 'px'}}>{EN ? 'Donate' : 'Donar'}</Nav.Link>
                        <Nav.Link href="/campaigns" style={{fontSize: this.state.fontSize + 'px'}}>{EN ? 'Campaigns' : 'Campañas'}</Nav.Link>
                        <Nav.Link href="/faq" style={{fontSize: this.state.fontSize + 'px'}}>FAQ</Nav.Link>
                        {/* <Nav.Link href="/profile" style={{fontSize:'30px'}}>Profile</Nav.Link>
                        <Nav.Link href="/login" style={{fontSize:'30px'}}>Log-in</Nav.Link> */}
                        <div style={{marginLeft:'5px'}}>
                            <Switch
                            onChange={this.onChange}
                            checked={this.state.checked}
                            handleDiameter={25}
                            offColor="#bebdbe"
                            onColor="#bebdbe"
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
                    <div style={{textAlign:'center', maxHeight:'50%', minHeight:'50%', overflow: 'hidden'}}>
                        <img  
                        style={{
                            minHeight:'100%',
                            minWidht:'100%',
                            display: this.state.displayImg,
                            opacity: this.state.opacity
                        }}
                            width="100%"
                            src={landingPic}
                            alt="home-banner"
                            />
                    </div>                
                </div>
            )
        }
    }
}

export default NavBar;