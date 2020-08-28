import React, { Component } from 'react';

import CardForDonation from './cardForDonation'
import  {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Tabs, Tab, TabPanel} from '@material-ui/core';


class donate extends Component{
    constructor(props) {
        super(props);
        this.state = {
             value: 0
             }
    }
    
    handle_change = (value) => {
        this.setState({ value })
    }
   
    render(){
        return(
            <div className="donate">     
             <h1 style={{padding:'45px'}}>
                 Donate Page
             </h1>
            <Drawer
            variant="permanent"
            >
            <div className="drawer">
                <List>
                    <ListItemText>
                        Categories
                    </ListItemText>
                </List>
                <Divider style={{backgroundColor:'white'}}/>
                <List>
                    {['Education', 'Medicine', 'Food', 'Small Business'].map((text, index) => (                         
                        <Tabs value={this.state.value} onChange={(event, value) => { this.handle_change(value) }}>
                            <Tab value={index} label={text} />                           
                        </Tabs>                   
                    ))}
                </List>
            </div>
            </Drawer>
        
             <CardForDonation  value={this.state.value} index={0}  name="Garcia" cause="books"/>
             <CardForDonation  value={this.state.value} index={1}  name="Enrique" cause="asma" />
             <CardForDonation  value={this.state.value} index={2}  name="Fernanda" cause="fruits" />
             <CardForDonation  value={this.state.value} index={3}  name="Miguel" cause="car" />
             <CardForDonation  value={this.state.value} index={2}  name="Luigi" cause="bread" />
             <CardForDonation  value={this.state.value} index={2}  name="Sara" cause="pizza" />
             <CardForDonation  value={this.state.value} index={1}  name="Olivia" cause="bandaids" />
             <CardForDonation  value={this.state.value} index={0}  name="Jazmin" cause="table" />
            </div>
        )
    }
}

export default donate;