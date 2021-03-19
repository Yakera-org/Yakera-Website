import React, { Component } from 'react';
import {Dialog, Grid} from '@material-ui/core';


import DonateCard from './DonateCard';

var marginOffset = 50;

class CampaignPageVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marginCard:marginOffset,
            showShare:false,
            imgClicked: false
        }
        this.onShare = this.onShare.bind(this);
        this.onDonate = this.onDonate.bind(this);
        this.imgClick = this.imgClick.bind(this);
    }

    imgClick(){
        this.setState({
            imgClicked: !this.state.imgClicked
        })
    }

    onShare(){
        this.setState({
            showShare: !this.state.showShare
        })
    }

    onDonate(){
        var element = document.getElementById("donateRef");
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    }

    componentDidMount(){
        if (typeof window !== "undefined") {
            const mql = window.matchMedia('(max-width: 600px)');
            window.onscroll = () => {
                let offset = marginOffset;
                let currentScrollPos = window.pageYOffset;  
                
                if(document.getElementById('left-col')){
                    var lowerBoundary = document.getElementById('left-col').offsetHeight - 500;
                }

                if(currentScrollPos > lowerBoundary){
                    currentScrollPos = lowerBoundary
                }
                if(!mql.matches){
                    this.setState({
                            marginCard: currentScrollPos + offset
                            })  
                    }
                else{
                    this.setState({
                        marginCard: 0
                        })  
                    }
                }
        }
    }

    render() {
        const campaign = this.props.campaign;
        const amount = this.props.amount;
        const target = campaign.target;
        const language = this.props.language;
        return (
            <div className = "camp-page-vis">
                <h1>{campaign.title[language]}</h1>  
                <Grid container spacing={4} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={8} id="left-col">
                        {/* left column  */}
                        <hr />              

                        <div className="campaign-page-title-img">
                            <img onClick={this.imgClick} src={campaign.image} alt="title.img"/>
                            
                                <Dialog
                                    fullWidth={true} 
                                    maxWidth='lg'                                 
                                    open={this.state.imgClicked}    
                                    onClose={this.imgClick}                                                                                                                                                    
                                >            
                                <img 
                                 id="exp-img"
                                 onClick={this.imgClick}
                                 src={campaign.image} 
                                 alt="title.img"
                                />
                                </Dialog>
                             
                        </div>

                        <p id="author-credit">{campaign.author} - {campaign.date}</p>

                        <hr style={{marginBottom:'-10px'}}/>    

                        <div className="camp-page-story">
                            {campaign.headers[language].map((h, i) =>{
                                return(
                                    <div key={h+i}>
                                        <h2 key={i}>{h}</h2>
                                        <p key={h}>{campaign.story[language][i]}</p>
                                    </div>
                                )
                            })}
                            {campaign.links ? 
                                <a href={campaign.links[0]}>https://assembly.malala.org/stories</a>
                                : 
                                ''
                            }
                            
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                         {/* right column  */}
                         <div style={{marginTop:this.state.marginCard+'px', width:'100%'}}>
                         <DonateCard
                            amount={amount}
                            target={target}
                            showShare={this.state.showShare}
                            onShare={this.onShare}
                            onClose={this.onShare}
                            onDonate={this.onDonate}
                            language={language}
                            />
                         </div>
                             
                        
                    </Grid>
                    
                </Grid>

            </div>
        );
    }
}

export default CampaignPageVisual;