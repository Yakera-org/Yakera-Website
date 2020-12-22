import React, { Component } from 'react';
import  { withRouter } from 'react-router-dom'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
    
    const { title } = this.props;
    let redirect = `/campaign/${title}`;
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
    const { author, description, deadline, title, image } = this.props;
    return (
      <div>
        <Card onClick={this.hanldeClick} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover} style={{backgroundColor:this.state.cardColor, borderRadius:'30px'}}>
          <CardHeader
            avatar={
              <Avatar aria-label={author}style={{backgroundColor:'#003049'}} >
                {author}
              </Avatar>
            }
            action={
            <IconButton aria-label="share">
              <ShareIcon />      
            </IconButton>
            }
            title={title}
            subheader={deadline}
            />
            <div style={{textAlign:'center', maxHeight:'300px', minHeight:'300px', overflow: 'hidden'}}>
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
            <Typography variant="body2" color="textPrimary" component="p">
              {description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
          </CardActions>
        </Card>
      </div>
    );
  }
}


export default withRouter (CampaignCard);