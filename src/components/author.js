

import React, { Component } from 'react';
import {en_pics} from './Pages/Home/picsHome.js';

var pics = en_pics;

class Author extends Component{
    
    render(){
        var lang = localStorage.getItem("lang");
        if(!lang){
            lang='en'
        }

        if(lang === "en"){
            return(
                <div className='author-page'>
                        <hr style={{width:'80%', marginLeft:'10%'}}/>

                        <div style={{textAlign:'left', padding:'0px', marginLeft: '10%'}}>
                            <img src={pics.logo} alt={'logo'} style={{height:"50px", paddingRight: "1%", verticalAlign:"middle"}}/>
                            <p style={{
                                color: 'grey',
                                fontSize: '20px',
                                float: "left"
                            }}>Yakera Inc.</p>
                            <ul style={{float:'right', listStyle:"none", paddingRight: '12%', fontSize:"30px"}}>
                                <li style={{display:"inline-block", margin:"0px"}} >
                                    <p style={{
                                        marginRight: "30px",
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: "left"
                                    }}>About Us</p>
                                    <a href={"terms"} style={{
                                        marginRight: "30px",
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: "left"
                                    }}>Terms and Conditions</a>
                                    <a href="consent" style={{
                                        marginRight: "300px",
                                        color: 'grey',
                                        fontSize: '20px',
                                        float: "left"
                                    }}>Legal</a>

                                    <a href={"https://www.facebook.com/Yakera.ve"}  rel="noopener noreferrer" target="_blank" style={{marginRight:"30px"}}>
                                        <i class="fab fa-facebook-square" style={{color:"black"}}></i>
                                    </a>
                                    <a href={"https://twitter.com/Yakera_ve"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                        <i className="fab fa-twitter-square" style={{color: "black"}}></i>
                                    </a>
                                    <a href={"https://www.instagram.com/yakera_ve/"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                        <i className="fab fa-instagram" style={{color: "black"}}></i>
                                    </a>
                                    <a href={"https://medium.com/@yakera.venezuela/yakera-re-imagining-peer-to-peer-aid-for-venezuelans-793024ac9767"} rel="noopener noreferrer"  target="_blank" style={{marginRight: "30px"}}>
                                        <i className="fab fa-medium" style={{color: "black"}}></i>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <hr style={{width:'80%', marginLeft:'10%'}}/>

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
                        <hr style={{width:'80%', marginLeft:'10%' }}/>

                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Yakera Inc. está resistrada como una organización 501(c)(4) exenta de impuestos.
                            <br />
                             Note por favor, que bajo nuestro estatus como 501(c)(4) somos una organización sin fines de lucro dedicada al bienestar social, pero las donaciones que recibimos no son deducibles de impuestos.
                            </p>
    
                        </div>  

                        <hr style={{width:'80%', marginLeft:'10%' }}/>
    
                        <div style={{textAlign:'center', padding:'20px'}}>
                            <p style={{
                                color:'grey',
                                fontSize:'20px'
                            }}>Esta página fue desarrollada por <b>Jang Belche</b> y <b>Louis Nicaud</b>
                            
                            <br />
    
                            Ambos son estudiantes e hicieron este trabajo en este sitio web durante su tiempo libre. 
    
                            <br />
    
                            Usted puede contactarlos <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/jang-belche/">aquí (Jang)</a> y <a style={{color:'grey', textDecoration: "underline"}} href="https://www.linkedin.com/in/louis-nicaud/">aquí (Louis)</a>
                            </p>
    
                        </div>         
                </div>
           
            )
        }

       
    }
}

export default Author;