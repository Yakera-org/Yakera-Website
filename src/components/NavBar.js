import React, {Component} from 'react';
import Navbar from 'react-bootstrap/NavBar';
import Nav from 'react-bootstrap/Nav';

import '../App.css';


class NavBar extends Component {
    render(){
        return( 
            <div>
                <Navbar  collapseOnSelect fixed="top" className='nav-bar' bg="blue" variant="dark" expand="lg">
                <Navbar.Brand className='nav-brand' href="/">Yakera</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link href="/info">Info</Nav.Link>
                    <Nav.Link href="/donate">Donate</Nav.Link>
                    <Nav.Link href="/login">Log-in</Nav.Link>
                    </Nav>                    

                </Navbar.Collapse>
                
                </Navbar>
            </div>
        )
    }
}

export default NavBar;