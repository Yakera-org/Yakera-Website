import React from 'react'
import { Grid } from '@material-ui/core';
import './AboutUs.css'
import text from './texts.json'
import pic1 from '../../../pics/raul.jpeg'
import pic2 from '../../../pics/aron.jpeg'
import pic3 from '../../../pics/thomas.JPG'
import pic4 from '../../../pics/jang.png'
import pic5 from '../../../pics/mafer.jpg'

const pics = [pic1, pic3, pic5, pic4, pic2]
const names = ['Tomas Munoz', 'Raul Romero', 'Mafer Bencoma', 'Jang Belche', 'Aaron `Lambert`']
const posts = ['CFO', 'Founder & CEO', 'CMO', 'CTO', 'COO']
const hrefs = ['https://www.linkedin.com/in/tomas-munoz-reyes-7b2202156/',
                'https://www.linkedin.com/in/raul-romero-martinez/',
                'https://www.linkedin.com/in/maferbencomo/',
                'https://www.linkedin.com/in/jang-belche/',
                'https://www.linkedin.com/in/aaron-lambert-b8b4b9183/']

function TeamSection() {
    return (
        <div className='about-us-team'>
            <h1>Our Team</h1>
            <br />
            <p>
                {text['team-text']}
            </p>
            <div className='about-us-team-pics'>
                <Grid container spacing={0}>
                    {
                        pics.map((pic,i) => {
                            let sm;
                            if(i<3){
                                sm = 4
                            }else{
                                sm = 6
                            }
                            return(
                                <Grid key={i} item xs={12} sm={sm}>
                                    <div className='outside-img'>
                                        <img src={pic} alt='profile-pics' /> 
                                        <h1 className='name'>{names[i]}&nbsp;
                                            <a id="icon" href={hrefs[i]} rel="noopener noreferrer"  target="_blank">
                                                <i className="fab fa-linkedin" ></i>
                                            </a>
                                        </h1>
                                        <h2 className='post'>{posts[i]}</h2>
                                    </div>
                                </Grid>
                            )
                        })
                    }
                    
                </Grid>
            </div>
        </div>
    )
}

export default TeamSection
