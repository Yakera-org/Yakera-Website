import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import banner_pic from '../../../pics/pattern-yakera.png'
import Drawer from './FAQDrawer'
import SearchIcon from '@material-ui/icons/Search';
import { Form, InputGroup } from 'react-bootstrap';

function FAQVisuals() {

    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className='faq-visuals'>
            
            <Grid container spacing={1} style={{ alignItems:'flex-start'}}>
                <Grid item xs={12} sm={12} >
                    <div className='faq-banner'>
                        <Grid container spacing={0} style={{ alignItems:'flex-start'}}>
                            <Grid item xs={12} sm={4} >    
                                    Frequently Asked Questions
                            </Grid>
                            <Grid item xs={12} sm={8} >   
                                <div className='img-wrapper'>
                                    <img alt='banner-pic' src={banner_pic} />

                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>

                
                <Grid item xs={12} sm={12} >
                    <div className='faq-drawer-area'>
                    <h1>What can we help you with?</h1>
                    <SearchBar 
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                    />

                        <Drawer />
                        <Drawer />
                        <Drawer />
                        <Drawer />
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default FAQVisuals


class SearchBar extends React.Component {
    
    render () {
        return (
            <InputGroup
                style={{
                    border: '1px solid #ced4da',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    width: '100%',
                    display: 'inline-flex',
                    marginTop: '10px'
                }}
            >
                <InputGroup.Text
                    style={{
                        border: 'none',
                        backgroundColor: 'white',
                    }}
                >
                    <SearchIcon />
                </InputGroup.Text>
                <Form.Control
                    type='search'
                    placeholder='Search...'
                    value={this.props.searchQuery}
                    onChange={e => this.props.setSearchQuery(e.target.value)}
                    style={{
                        border: 'none',
                        backgroundColor: 'white',
                    }}
                />
            </InputGroup>
        )
    }
};