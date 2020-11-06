import React, {Component} from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

import landingPic from '../pics/landingPic.jpg'

import '../App.css';


class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bgColor : 'blue',
            navSize : 200,
            opacity: 1,
            displayImg: ''
        }
    }
    componentWillMount(){
        if(window.location.pathname == '/'){
            this.setState({
                bgColor: 'transparent',
                navSize: 500,
                displayImg: ''
            })
        }else{
            this.setState({
                bgColor:'blue',
                navSize: 150,
                displayImg: 'none'
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
    render(){
        return( 
            <div>
                <Navbar  collapseOnSelect fixed="top" className='nav-bar' bg={this.state.bgColor} variant="dark" expand="lg"
                 style={{height:this.state.navSize, position:'absolute'}}>

                <Navbar.Brand className='nav-brand' href="/">Yakera</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
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