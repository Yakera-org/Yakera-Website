import React, { useState } from 'react';
import { Grid } from '@material-ui/core';
import Drawer from './FAQDrawer'
import Author from '../../author';
import content from './FAQ.json'

const banner_pic = 'https://assets.yakera.org/yakera/faq-title.jpg';

function FAQVisuals(props) {

    const [searchQuery] = useState('');
    const EN = props.EN
    const language = EN ? 'en' : 'es'
    const filterCampaignsBySearch = (content, query) => {
        if(!query) {
            return content[language];
        }
        const result = content[language].filter(drawer => {
            return(drawer.questions[0].toLowerCase().includes(query))
        });
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
                                    {EN ? 'Frequently Asked Questions' : 'Preguntas frecuentes'}
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
                        <h1>
                            {EN ? 'What can we help you with?' : 'Cómo le podemos ayudar?'}
                        </h1>
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