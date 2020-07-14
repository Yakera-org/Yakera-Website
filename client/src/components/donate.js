import React, { Component } from 'react';

import CardForDonation from './cardForDonation'
import  {Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';


class donate extends Component{
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
                    {['Transport', 'Medicine', 'Food', 'Business'].map((text, index) => (
                        <ListItem button key={text}>                        
                        <ListItemText primary={text} />
                    </ListItem>
                    ))}
                </List>
            </div>
            </Drawer>
             <CardForDonation name="Garcia" cause="medicine"/>
             <CardForDonation name="Enrique" cause="car" />
             <CardForDonation name="Gustavo" cause="food" />
            </div>
        )
    }
}

export default donate;