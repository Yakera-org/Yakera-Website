

import React, { Component } from 'react';

class Author extends Component{
    
    render(){
        return(
            <div className='author-page'>
                    <hr style={{width:'80%', marginLeft:'10%' }}/>

                    <div style={{textAlign:'center', padding:'20px'}}>
                        <p style={{
                            color:'grey',
                            fontSize:'20px'
                        }}>This page is developed by <b>Jang Belche</b> and <b>Louis Nicaud</b>
                        
                        <br />

                        Both are students and did work on this website in their free time

                        <br />

                        You can reach out to them <a style={{color:'grey'}} href="https://www.linkedin.com/in/jang-belche/">here (Jang)</a> and <a style={{color:'grey'}} href="https://www.linkedin.com/in/louis-nicaud/">here (Louis)</a>
                        </p>

                    </div>         
            </div>
       
        )
    }
}

export default Author;