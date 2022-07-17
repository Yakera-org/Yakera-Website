import React from 'react'
import { Grid } from '@material-ui/core';
import FAQQuestion from './FAQQuestion';
import aboutYakera from "../../../pics/aboutYakera.png"
import createCampaign from "../../../pics/createCampaign.png"
import withdrawing from "../../../pics/withdrawing.png"
import supportUs from "../../../pics/supportUs.png"

function FAQDrawer(props) {
      const title = props.title
      const questions = props.questions
      const answers = props.answers
      const image = props.image
      var nameToImage = {};
      nameToImage["aboutYakera"] = aboutYakera
      nameToImage["createCampaign"] = createCampaign
      nameToImage["withdrawing"] = withdrawing
      nameToImage["supportUs"] = supportUs
      console.log(image)
    return (
        <div>
            <Grid container spacing={1} style={{ alignItems:'center'}}>
                <Grid item xs={12} sm={12} >
                    <div className='banner-img-mweb'><img alt='banner-img' className="banner-img" src={nameToImage[image]}/></div>
                    <div className='drawer-title'>{title}</div>
                </Grid>
                <div className='faq-question-area'>
                    {
                        questions.map((question, i) => {
                            return(
                                <div key={i}>
                                    <FAQQuestion
                                        question={question}
                                        answer={answers[i]}
                                        
                                    />
                                   
                                </div>
                                )
                        })



                    }
                </div>
            </Grid>
                  
      </div>
    )
}

export default FAQDrawer
