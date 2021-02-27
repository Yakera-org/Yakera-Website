import React, { Component } from 'react';
import  { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ShareIcon from '@material-ui/icons/Share';

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
    const { campaign } = this.props;
    const date = campaign.date;
    const author = campaign.authorInitial;
    const title = campaign.title[this.props.language];
    const description = campaign.description[this.props.language];
    const image = campaign.image;

    return (
      <div>
        <Card onClick={this.hanldeClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} style={{backgroundColor:this.state.cardColor, borderRadius:'30px', borderStyle:'solid', borderColor:this.props.color, borderWidth:'2px', cursor:'pointer'}}>
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
            title={title}
            subheader={date}
            />
            <div style={{textAlign:'center', maxHeight:'300px', minHeight:'300px', overflow: 'hidden',boxShadow:'10px 10px 10px #888'}}>
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

            <p style={{fontSize:'18px'}}>
              {description}
            </p>

          </CardContent>
        </Card>
      </div>
    );
  }
}


export default withRouter (CampaignCard);