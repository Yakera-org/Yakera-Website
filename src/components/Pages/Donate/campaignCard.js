import React, { Component } from 'react';
import  { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";

import './campaignCard.css';

const sp_headers = {
  "education":"Educación",
  "healthcare":"Atención Médica",
  "nutrition":"Nutrición",
  "business":"Pequeños Negocios"
}

const en_headers = {
  "education":"Education",
  "healthcare":"Healthcare",
  "nutrition":"Nutrition",
  "business":"Small Business"
}

class CampaignCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardColor:'white'
    }
    this.hanldeClick = this.hanldeClick.bind(this);
    this.handleHover = this.handleHover.bind(this);
  }   
  
  hanldeClick(){    
    const { campaign } = this.props;
    let redirect = `/campaign/${campaign.title.en}`;
    this.props.history.push(redirect);
  }

  handleHover(){
    if (this.state.cardColor === "white"){
      this.setState({
        cardColor:'#DEDEDE'
      })
    }else{
      this.setState({
        cardColor:'white'
      })
    }
  }

  render(){
    const { campaign, icon } = this.props;
    const title = campaign.title[this.props.language];
    const description = campaign.description[this.props.language];
    const image = campaign.image;
    const category = campaign.category;
    const target = campaign.target;

    return (
      <div>
        <Card 
          className="camp-card" 
          onClick={this.hanldeClick} 
          onMouseEnter={this.handleHover} 
          onMouseLeave={this.handleHover} 
          style={{backgroundColor:this.state.cardColor, borderRadius:'20px'}}
        >
          <CardHeader
            titleTypographyProps={{variant:'p' }}
            style={{
              textAlign: 'center',
              backgroundColor:
                category === 'education'
                  ? 'var(--category-green)'
                  : category === 'healthcare'
                    ? 'var(--category-red)'
                    : category === 'nutrition'
                      ? 'var(--category-yellow)'
                      : 'var(--category-dark-blue)',
              color: category === 'nutrition' ? 'black' : 'white',
              fontFamily: 'Intro-Regular-Alt',
              fontSize: '20px',
              padding: '12px',
            }}
            title={
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <img src={icon} alt='icon' style={{ width: '1.3rem', height: '1.3rem' }} />
                &nbsp;
                {this.props.language === "en"
                  ? en_headers[category]
                  : sp_headers[category]                
                }
              </div>
            }
          />
          <div className='cam-img' >
            <img 
            style={{
              minHeight:'100%',
              minWidht:'100%',
            }}
              width="100%"
              src={image}
              alt={title}
            />
          </div>
          <CardContent > 
            <div className='logo-sec'>
              <p><b>{title}</b></p>
            </div>
            <div className='description'>
              <p>              
                {description}
              </p>
            </div>
            <div className='progress-text'>
              <p>
                <b>${this.props.amount}</b>
                {` raised of $${target}`}
              </p>
            </div>
            <Progress theme={{
                default: {
                    trailColor: 'lightgrey',
                    symbol: '',
                    color: this.props.color
                }
              }}
              status="default"
              percent={ Math.min((100* (this.props.amount/target)).toFixed(1), 100) }
            />
            <div id="read-more">
              {this.props.language==="en" ? 'Click on the card to read more' : 'Haga clic en la tarjeta para leer más'}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}


export default withRouter (CampaignCard);