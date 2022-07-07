import React, { useState } from 'react';
import { Grid, Hidden } from '@material-ui/core';
import Drawer from './FAQDrawer'
import Author from '../../author';
import content from './FAQ.json';
import WhatsAppButton from '../WhatsAppButton/WhatsAppButton.js';

const banner_left = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/FAQ-Banner-Left.png";
const banner_right = "https://yakera-files.s3.us-east-2.amazonaws.com/yakera/FAQ-Banner-Right.png";
const bottom_pic = 'https://yakera-files.s3.us-east-2.amazonaws.com/yakera/FAQ-Bottom.png';

function FAQVisuals(props) {

    const [searchQuery] = useState('');
    const EN = props.EN
    const language = EN ? 'en' : 'es'
    const targetRef = React.useRef(null);

    const filterCampaignsBySearch = (content, query) => {
        if (!query) {
            return content[language];
        }
        const result = content[language].filter(drawer => {
            return (drawer.questions[0].toLowerCase().includes(query))
        });
        return result;
    };

    let filteredContent = filterCampaignsBySearch(content, searchQuery)

    return (
        <div className='faq-visuals'>
            <WhatsAppButton EN={EN} targetRef={targetRef}></WhatsAppButton>
            <Grid container spacing={1} >
                <Grid container item={true} xs={12} sm={12} spacing={0}>
                    <Hidden xsDown>
                        <Grid item sm={4} sx={{ display: { xs: "none", lg: "block" } }}>

                            <img alt='banner-pic' className="banner-img" src={banner_left} />
                        </Grid></Hidden>
                    <Grid item xs={12} sm={4} className="banner-text-wrapper">
                        {EN ?
                            <h1 className="banner-text"><b>Frequently Asked <span style={{ color: "#e98737" }}>Questions</span></b></h1>
                            :
                            <h1 className="banner-text"><b>Preguntas <span style={{ color: "#e98737" }}>Frecuentes</span></b></h1>

                        }
                    </Grid>
                    <Hidden xsDown>
                        <Grid item sm={4} className="banner-text-wrapper">
                            <img alt='banner-pic' className="banner-img" src={banner_right} />
                        </Grid></Hidden>
                </Grid>

                <Grid item xs={12} sm={12}>
                    <div className='faq-drawer-area'>
                        {/* <SearchBar 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        /> */}
                        {
                            filteredContent.map((element, i) => {
                                return (
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
                <div className="bottom-wrapper" >
                    <Grid container spacing={1} item={true} >
                        <Hidden xsDown>
                            <Grid item xs={12} sm={5}>  <img alt='banner-pic' className="bottom-pic" src={bottom_pic} style={{ width: "100%", marginLeft: "0%" }} /> </Grid>
                        </Hidden>
                        <Grid item xs={12} sm={7}> <div style={{ padding: "10px 0px 10px 0px" }}>
                            {EN ?
                                <b className="bottom-text">How do I contact Yakera if I have a question or need support?</b>
                                :
                                <b className="bottom-text">¿Cómo contacto a Yakera si tengo alguna pregunta o necesito apoyo?</b>
                            }

                        </div>
                            <div style={{ padding: "10px 0px 50px 0px" }}>
                                {EN ?
                                    <div>
                                        Contact a member of our support team at <a href="https://walink.co/6d9a42">this link</a>, via email at <a href="mailto: info@yakera.org">info@yakera.org</a> or through our social media by finding us as <a href="https://twitter.com/yakeraorg">@yakeraorg</a>.
                                    </div>
                                    :
                                    <div>
                                        Ponte en contacto con un miembro de nuestro equipo de soporte en <a href="https://walink.co/6d9a42">este link</a>, vía mail a <a href="mailto: info@yakera.org">info@yakera.org</a> o por nuestras redes sociales encontrándonos como <a href="https://twitter.com/yakeraorg">@yakeraorg</a>.

                                    </div>

                                }
                            </div>

                        </Grid>

                    </Grid></div>
            </Grid>

            <div ref={targetRef}>
                <Author />
            </div>
        </div>
    )
}

export default FAQVisuals