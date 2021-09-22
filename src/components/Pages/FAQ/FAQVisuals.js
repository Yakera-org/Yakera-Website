import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Drawer from './FAQDrawer'
import Author from '../../author';
import content from './FAQ.json'

const banner_pic = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/faq-title.jpg';

function FAQVisuals() {

    const [searchQuery] = useState('');
    const filterCampaignsBySearch = (content, query) => {
        if(!query) {
            return content.en;
        }
        const result = content.en.filter(drawer => {
            return(drawer.questions[0].toLowerCase().includes(query))
        });
        console.log(result)
        return result;
    };

    let filteredContent = filterCampaignsBySearch(content, searchQuery)

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
                        {/* <SearchBar 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        /> */}
                        {
                            filteredContent.map((element, i) => {
                                return(
                                    <Drawer 
                                        title={element.title}
                                        questions={element.questions}
                                        answers={element.answers}
                                        key={i}
                                    />
                                )                                
                            })
                        }
                    </div>
                </Grid>
            </Grid>

            <Author />

        </div>
    )
}

export default FAQVisuals