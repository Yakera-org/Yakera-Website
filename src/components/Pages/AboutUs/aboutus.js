import React, { Component } from 'react';
import './about.css';
import {en_pics, sp_pics} from './pics.js';
import texts from './texts.json';
import Author from '../../author';

var pics = en_pics;

class AboutUs extends Component{

    constructor(props) {
        super(props);
        this.state = {
            opacity: 1,
            loaded: false
        }
    }

    componentDidMount() { 
        if (typeof window !== "undefined") {
            window.onscroll = () => {
            let currentScrollPos = 600 - window.pageYOffset;

            this.setState({
                    opacity: currentScrollPos / 300,
                    })  
            }
        }

        var lang = localStorage.getItem("lang");
        if(lang){
            this.setState({
                language: lang
            })
        }else{
            localStorage.setItem("lang", this.state.language);
        }

        if(lang === "en"){
            pics = en_pics;
        }else{
            pics = sp_pics;
        }

        this.setState({
            loaded: true
        })
    }
    
    render(){
        if(!this.state.loaded){
            return(
                <div>
                    Loading
                </div>
            )
        }else{
            var EN = true //is english
            if(this.state.language === 'en'){
                EN = true
            }else{
                EN = false
            }
            return(
                <div className='about'>
                        <div style={{textAlign:'center', maxHeight:'60vh', minHeight:'40%', overflow: 'hidden', marginTop:'-100px'}}>
                            <img  
                                style={{
                                    minHeight:'100%',
                                    minWidht:'100%',
                                    opacity: this.state.opacity
                                }}
                                width="100%"
                                src={pics.about}
                                alt="about-banner"
                                />
                        </div>
                        <div className='about-page'>
                            
                            <h1>{EN ? 'What is Yakera?' : '¿Qué es Yakera?'}</h1>
                            {texts[this.state.language].what.map((p, index) => 
                            <div key={index+"d"}>
                                <p key={index}>
                                    {p}
                                </p> 
                            </div>
                                )}

                            <div className='about-banner-page'>
                                <img
                                    width="100%"
                                    src={pics.mission}
                                    alt="mission"
                                />
                            </div>

                            <h1>{EN ? 'Mission' : 'Nuestra Misión'}</h1>
                            <p>
                                {texts[this.state.language].mission}
                            </p>

                            <div className='about-banner-page'>
                                <img
                                    width="100%"
                                    src={pics.what}
                                    alt="what"
                                />
                            </div>

                            <h1>{EN ? 'What do we want to accomplish?' : '¿Qué queremos lograr?'}</h1>
                            <p>
                                {texts[this.state.language].accomplish}
                            </p>

                            <div className='about-banner-page'>
                                <img
                                    width="100%"
                                    src={pics.how}
                                    alt="how"
                                />
                            </div>

                            <h1>{EN ? 'How it works' : 'Como funciona'}</h1>
                            <p>
                                {texts[this.state.language].how}
                            </p>

                            <div className='about-banner-page'>
                                <img
                                    width="100%"
                                    src={pics.trial}
                                    alt="trial"
                                />
                            </div>
                            <h1>{EN ? 'Community Trial' : 'Piloto Comunitario '}</h1>
                            <p>
                                {texts[this.state.language].trial}
                            </p>

                            <div className='about-banner-page'>
                                <img
                                    width="100%"
                                    src={pics['long-term']}
                                    alt="trial"
                                />
                            </div>
                            <h1>{EN ? 'Our Long-Term Goals' : 'Nuestras metas a largo plazo.'}</h1>
                            <p>
                                {texts[this.state.language].goals}
                            </p>

                            <div className='about-sdg-page'>
                                <img
                                    width="100%"
                                    src={pics.sdgs}
                                    alt="sdgs"
                                />
                            </div>

                            <h1>{EN ? 'Yakera and the Sustainable Development Goals' : 'Yakera y las metas de desarrollo sostenible'}</h1>
                            <p>
                                {texts[this.state.language].sdgs}
                            </p>
                            
                            <div className='sdg-card'>
                                <img
                                    width="100%"
                                    src={pics.sdg1}
                                    alt="sdg1"
                                />
                            </div>
                            <p>
                                <b>{texts[this.state.language].sdg1[0]}</b>
                                <br />
                                {texts[this.state.language].sdg1[1]}
                            </p>

                            <div className='sdg-card'>
                                <img
                                    width="100%"
                                    src={pics.sdg2}
                                    alt="sdg2"
                                />
                            </div>
                            <p>
                                <b>{texts[this.state.language].sdg2[0]}</b>
                                <br />
                                {texts[this.state.language].sdg2[1]}
                            </p>

                            <div className='sdg-card'>
                                <img
                                    width="100%"
                                    src={pics.sdg3}
                                    alt="sdg3"
                                />
                            </div>
                            <p>
                                <b>{texts[this.state.language].sdg3[0]}</b>
                                <br />
                                {texts[this.state.language].sdg3[1]}
                            </p>

                            <div className='sdg-card'>
                                <img
                                    width="100%"
                                    src={pics.sdg4}
                                    alt="sdg4"
                                />
                            </div>
                            <p>
                                <b>{texts[this.state.language].sdg4[0]}</b>
                                <br />
                                {texts[this.state.language].sdg4[1]}
                            </p>

                            <div className='sdg-card'>
                                <img
                                    width="100%"
                                    src={pics.sdg8}
                                    alt="sdg8"
                                />
                            </div>
                            <p>
                                <b>{texts[this.state.language].sdg8[0]}</b>
                                <br />
                                {texts[this.state.language].sdg8[1]}
                            </p>
                                

                        </div>

                        <Author />
                </div>
            
            )
        }
    }
}

export default AboutUs;