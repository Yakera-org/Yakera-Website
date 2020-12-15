import React, {Component} from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

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
            brandSize: 50
        }
    }
    componentWillMount(){
        if(window.location.pathname === '/'){
            if(window.matchMedia('(max-width: 600px)').matches){
                this.setState({
                    bgColor: 'transparent',
                    navSize: '10%',
                    displayImg: '',
                    brandSize: 50
                })
            }else{
                this.setState({
                    bgColor: 'transparent',
                    navSize: '50%',
                    displayImg: '',
                    brandSize: 120
                })
            }
        }else if(window.location.pathname === '/donate'){
           if(window.matchMedia('(max-width: 600px)').matches){
               this.setState({
                   bgColor: 'transparent',
                   navSize: '10%',
                   displayImg: 'none',
                   brandSize: 40
               })
           }else{
                this.setState({
                    bgColor:'transparent',
                    navSize: '15%',
                    displayImg: 'none',
                    brandSize: 50
            })
           }

        }
        else{
            this.setState({
                bgColor:'blue',
                navSize: '15%',
                displayImg: 'none',
                brandSize: 50
            })
        };            
        }
    componentDidMount() {
        if (typeof window !== "undefined") {
            window.onscroll = () => {
            let currentScrollPos = 500 - window.pageYOffset;

            this.setState({ opacity: currentScrollPos / 200 })
            
            }
        }
        }

    handleToggle(){
        let currentNavSize = this.state.navSize;

        if(window.location.pathname === '/donate'){
            if(this.state.bgColor === 'transparent'){
                this.setState({
                    bgColor: 'darkred',
                    navSize: '40%',
                    displayImg: 'none',
                    brandSize: 40
                })
            }else{
                this.setState({
                    bgColor: 'transparent',
                    navSize: '10%',
                    displayImg: 'none',
                    brandSize: 40
                })
            }
        }
        if(window.location.pathname === '/'){
            if(this.state.bgColor === 'transparent'){
                this.setState({
                    bgColor: 'beige',
                    navSize: '40%',
                    displayImg: 'none',
                    brandSize: 40
                })
            }else{
                this.setState({
                    bgColor: 'transparent',
                    navSize: '10%',
                    displayImg: '',
                    brandSize: 50
                })
            }
        }
        if(currentNavSize === '15%'){
            this.setState({
                navSize: '40%'
            });
        }else if(currentNavSize === '40%'){
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
                <Navbar.Toggle  />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/info" style={{fontSize:'30px'}}>Info</Nav.Link>
                    <Nav.Link href="/donate" style={{fontSize:'30px'}}>Donate</Nav.Link>
                    <Nav.Link href="/campaigns" style={{fontSize:'30px'}}>Campaigns</Nav.Link>
                    {/* <Nav.Link href="/profile" style={{fontSize:'30px'}}>Profile</Nav.Link>
                    <Nav.Link href="/login" style={{fontSize:'30px'}}>Log-in</Nav.Link> */}
                    </Nav>                    

                </Navbar.Collapse>
                
                </Navbar>
                <img src={landingPic} width='150px' style={{ marginTop:0, marginBottom:'-100px', width:'100%', opacity: this.state.opacity, display: this.state.displayImg}} alt='Airtm logo' />
                
            </div>
        )
    }
}

export default NavBar;