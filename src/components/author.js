

import React, { Component } from 'react';
import {pics} from './Pages/Home/picsHome.js';
import './author.css';

class Author extends Component{
    
    render(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            lang='en'
        }

        if(lang === "en"){
            return(
                <div className='author-page'>
                        <hr style={{width:'80%', marginLeft:'10%', marginBottom:'50px'}}/>

                        <div style={{textAlign:'left', padding:'0px', marginLeft: '10%'}}>
                            <img src={pics.logo} alt={'logo'} style={{height:"50px", paddingBottom:'20px'}}/>
                            
                            <ul id="footer-ul" >
                                <li  style={{display:"inline-block", margin:"0px", width:'100%', textAlign:'center'}} >
                                    <a id="footer-item" href={"info"} style={{
                                        marginRight: "30px",
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: "left"
                                    }}>About Us</a>
                                    <a id="footer-item" href={"terms"} style={{
                                        marginRight: "30px",
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: "left"
                                    }}>Terms and Conditions</a>
                                    <a id="footer-item" href="consent" style={{
                                        marginRight: "300px",
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: "left"
                                    }}>Legal</a>

                                    <a id="footer-item" href={"https://www.facebook.com/Yakera.ve"}  rel="noopener noreferrer" target="_blank" style={{marginRight:"30px"}}>
                                        <i className="fab fa-facebook-square" style={{color:"grey"}}></i>
                                    </a>
                                    <a id="footer-item" href={"https://twitter.com/Yakera_ve"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                        <i className="fab fa-twitter-square" style={{color: "grey"}}></i>
                                    </a>
                                    <a id="footer-item" href={"https://www.instagram.com/yakera_ve/"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                        <i className="fab fa-instagram" style={{color: "grey"}}></i>
                                    </a>
                                    <a id="footer-item" href={"https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                        <i className="fab fa-medium" style={{color: "grey"}}></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <hr id="footer-hr" style={{width:'80%', marginLeft:'10%'}}/>


                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Yakera Inc. is registered as a tax-exempt 501(c)(4) organization.
                                <br />
                                Please note that under our status as 501(c)(4) we are a non for profit organization devoted to social welfare, but donations made to us are not tax deductible.
                            </p>

                        </div>

                        <hr style={{width:'80%', marginLeft:'10%'}}/>


                        <div style={{textAlign:'center', padding:'20px'}}>
                                    <p style={{
                                        color:'grey',
                                        fontSize:'20px'
                                    }}>This page is developed by the <b>Software Engineering</b> team at <b>Yakera</b>

                                    <br />

                                    All members of the team are students and have developed this website on their free-time.

                                    <br />

                                    {/*You can reach out to them <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/jang-belche/">here (Jang)</a> and <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/louis-nicaud/">here (Louis)</a>*/}
                                    </p>

                        </div>

                </div>
           
            )
        }else{
            return(
                <div className='author-page'>
                <hr style={{width:'80%', marginLeft:'10%', marginBottom:'50px'}}/>

                <div style={{textAlign:'left', padding:'0px', marginLeft: '10%'}}>
                    <img src={pics.logo} alt={'logo'} style={{height:"50px", paddingBottom:'20px'}}/>
                    
                    <ul id="footer-ul" >
                        <li  style={{display:"inline-block", margin:"0px", width:'100%', textAlign:'center'}} >
                            <a id="footer-item" href={"info"} style={{
                                marginRight: "30px",
                                color: 'grey',
                                fontSize: '20px',
                                float: "left"
                            }}>Info</a>
                            <a id="footer-item" href={"terms"} style={{
                                marginRight: "30px",
                                color: 'grey',
                                fontSize: '20px',
                                float: "left"
                            }}>Términos y condiciones</a>
                            <a id="footer-item" href="consent" style={{
                                marginRight: "300px",
                                color: 'grey',
                                fontSize: '20px',
                                float: "left"
                            }}>Legal</a>

                            <a id="footer-item" href={"https://www.facebook.com/Yakera.ve"}  rel="noopener noreferrer" target="_blank" style={{marginRight:"30px"}}>
                                <i className="fab fa-facebook-square" style={{color:"grey"}}></i>
                            </a>
                            <a id="footer-item" href={"https://twitter.com/Yakera_ve"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                <i className="fab fa-twitter-square" style={{color: "grey"}}></i>
                            </a>
                            <a id="footer-item" href={"https://www.instagram.com/yakera_ve/"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                <i className="fab fa-instagram" style={{color: "grey"}}></i>
                            </a>
                            <a id="footer-item" href={"https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                <i className="fab fa-medium" style={{color: "grey"}}></i>
                            </a>
                        </li>
                    </ul>
                </div>

                <hr id="footer-hr" style={{width:'80%', marginLeft:'10%'}}/>


                <div style={{textAlign:'center', padding:'20px'}}>
                    <p style={{
                        color:'grey',
                        fontSize:'20px'
                    }}>Yakera Inc. está resistrada como una organización 501(c)(4) exenta de impuestos.
                        <br />
                        Note por favor, que bajo nuestro estatus como 501(c)(4) somos una organización sin fines de lucro dedicada al bienestar social, pero las donaciones que recibimos no son deducibles de impuestos.
                    </p>

                </div>

                <hr style={{width:'80%', marginLeft:'10%'}}/>


                <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Esta página fue desarrollada para la <b>Equipo de ingeniería de software</b> de <b>Yakera</b>

                            <br />

                            Ambos son estudiantes e hicieron este trabajo en este sitio web durante su tiempo libre.

                            <br />

                            {/*You can reach out to them <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/jang-belche/">here (Jang)</a> and <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/louis-nicaud/">here (Louis)</a>*/}
                            </p>

                </div>

        </div>
           
            )
        }

       
    }
}

export default Author;