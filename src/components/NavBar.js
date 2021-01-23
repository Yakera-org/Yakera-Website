import React, {Component} from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

import landingPic from '../pics/landingPic.jpg'

import '../App.css';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleToggle = this.handleToggle.bind(this);
        this.state = {
            bgColor : 'blue',
            navSize : '50%',
            opacity: 1,
            displayImg: '',
            brandSize: 50,
            fontSize: 30
        }
    }

    componentDidMount() {
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
    render(){
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
                    <Nav.Link href="/donate" style={{fontSize: this.state.fontSize + 'px'}}>Donate</Nav.Link>
                    <Nav.Link href="/campaigns" style={{fontSize: this.state.fontSize + 'px'}}>Campaigns</Nav.Link>
                    <Nav.Link href="/faq" style={{fontSize: this.state.fontSize + 'px'}}>FAQ</Nav.Link>
                    <Nav.Link href="/terms" style={{fontSize: this.state.fontSize + 'px'}}>Terms & Conditions</Nav.Link>
                    {/* <Nav.Link href="/profile" style={{fontSize:'30px'}}>Profile</Nav.Link>
                    <Nav.Link href="/login" style={{fontSize:'30px'}}>Log-in</Nav.Link> */}
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

export default NavBar;