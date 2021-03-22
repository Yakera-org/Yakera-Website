import React, { Component } from 'react';
import  { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';
import { Progress } from 'react-sweet-progress';

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
    const { campaign, logo } = this.props;
    const date = campaign.date;
    const author = campaign.authorInitial;
    const title = campaign.title[this.props.language];
    const description = campaign.description[this.props.language];
    const image = campaign.image;
    const category = campaign.category;
    const target = campaign.target;

    return (
      <div>
        <Card className="camp-card" onClick={this.hanldeClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} style={{backgroundColor:this.state.cardColor, borderRadius:'20px'}}>
          <CardHeader
            avatar={
              <Avatar aria-label={author}style={{backgroundColor:this.props.color}} >
                {author}
              </Avatar>
            }
            action={
            <IconButton aria-label="share">
              <ShareIcon />      
            </IconButton>
            }
            titleTypographyProps={{variant:'h6' }}
            title={title}
            subheader={date}
            />
            <div style={{textAlign:'center', maxHeight:'300px', overflow: 'hidden',boxShadow:'10px 10px 10px #888'}}>
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
          <CardContent>
              
            <div className="logo-sec">
              <img src={logo} alt="logo"/>
              <p>
                <b>
                {this.props.language === "en"? 
                 en_headers[category]
                 :
                 sp_headers[category]                
                 }
               </b>
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
            <p style={{fontSize:'18px', marginTop:'15px'}}>              
              {description}
            </p>

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