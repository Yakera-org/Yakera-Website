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
            this.setState({
                bgColor: 'transparent',
                navSize: '50%',
                displayImg: '',
                brandSize: 100
            })
        }else{
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
        let currentNavSize = this.state.navSize
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
                    <Nav.Link href="/info">Info</Nav.Link>
                    <Nav.Link href="/donate">Donate</Nav.Link>
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    <Nav.Link href="/login">Log-in</Nav.Link>
                    </Nav>                    

                </Navbar.Collapse>
                
                </Navbar>
                <img src={landingPic} width='150px' style={{ marginTop:0, marginBottom:'-100px', width:'100%', opacity: this.state.opacity, display: this.state.displayImg}} alt='Airtm logo' />
                
            </div>
        )
    }
}

export default NavBar;