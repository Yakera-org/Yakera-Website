import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import banner_pic from '../../../pics/pattern-yakera.png'
import Drawer from './FAQDrawer'
import SearchIcon from '@material-ui/icons/Search';
import { Form, InputGroup } from 'react-bootstrap';
import Author from '../../author';


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

                        <Drawer 
                            title={'About Yakera, our story, and our mission'}
                            questions={['How does Yakera work?', 'How much of my donation goes to people in Venezuela?']}
                            answers={['Yakera sends the donation made through PayPal or card to the AirTM account of the campaigner. This transaction is done with an exchange from USD to an equivalent of the pegged currency AirUSD and allows the recipient to save the money in their account, transfer it to a bank, or withdraw it in cash. This is all done by AirTM’s network of cashiers in Venezuela who complete secure, untraceable transactions in approximately 15 minutes. Users making donations can use whichever card they prefer and recipients will receive the donation at a fair exchange rate without inflation or currency restrictions.', 'We are committed to ensuring that 100% of donations go directly to the user in Venezuela. There is no fee to withdraw funds and our service fees are charged on top of the donation to avoid any misallocation. However much you donate, you can be confident that the entire amount will be given to the organizer of the campaign (at the cost of a small fee on top to sustain operations at Yakera as well).true']}
                        />
                        <Drawer 
                            title={'About Yakera, our story, and our mission'}
                            questions={['How does Yakera work?', 'How much of my donation goes to people in Venezuela?']}
                            answers={['Yakera sends the donation made through PayPal or card to the AirTM account of the campaigner. This transaction is done with an exchange from USD to an equivalent of the pegged currency AirUSD and allows the recipient to save the money in their account, transfer it to a bank, or withdraw it in cash. This is all done by AirTM’s network of cashiers in Venezuela who complete secure, untraceable transactions in approximately 15 minutes. Users making donations can use whichever card they prefer and recipients will receive the donation at a fair exchange rate without inflation or currency restrictions.', 'We are committed to ensuring that 100% of donations go directly to the user in Venezuela. There is no fee to withdraw funds and our service fees are charged on top of the donation to avoid any misallocation. However much you donate, you can be confident that the entire amount will be given to the organizer of the campaign (at the cost of a small fee on top to sustain operations at Yakera as well).true']}
                        />
                        <Drawer 
                            title={'About Yakera, our story, and our mission'}
                            questions={['How does Yakera work?', 'How much of my donation goes to people in Venezuela?']}
                            answers={['Yakera sends the donation made through PayPal or card to the AirTM account of the campaigner. This transaction is done with an exchange from USD to an equivalent of the pegged currency AirUSD and allows the recipient to save the money in their account, transfer it to a bank, or withdraw it in cash. This is all done by AirTM’s network of cashiers in Venezuela who complete secure, untraceable transactions in approximately 15 minutes. Users making donations can use whichever card they prefer and recipients will receive the donation at a fair exchange rate without inflation or currency restrictions.', 'We are committed to ensuring that 100% of donations go directly to the user in Venezuela. There is no fee to withdraw funds and our service fees are charged on top of the donation to avoid any misallocation. However much you donate, you can be confident that the entire amount will be given to the organizer of the campaign (at the cost of a small fee on top to sustain operations at Yakera as well).true']}
                        />
                        <Drawer 
                            title={'About Yakera, our story, and our mission'}
                            questions={['How does Yakera work?', 'How much of my donation goes to people in Venezuela?']}
                            answers={['Yakera sends the donation made through PayPal or card to the AirTM account of the campaigner. This transaction is done with an exchange from USD to an equivalent of the pegged currency AirUSD and allows the recipient to save the money in their account, transfer it to a bank, or withdraw it in cash. This is all done by AirTM’s network of cashiers in Venezuela who complete secure, untraceable transactions in approximately 15 minutes. Users making donations can use whichever card they prefer and recipients will receive the donation at a fair exchange rate without inflation or currency restrictions.', 'We are committed to ensuring that 100% of donations go directly to the user in Venezuela. There is no fee to withdraw funds and our service fees are charged on top of the donation to avoid any misallocation. However much you donate, you can be confident that the entire amount will be given to the organizer of the campaign (at the cost of a small fee on top to sustain operations at Yakera as well).true']}
                        />
                    </div>
                </Grid>
            </Grid>

            <Author />

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