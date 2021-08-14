import React, { Component } from 'react';
import {Dialog, Grid} from '@material-ui/core';
import DonateCard from './DonateCard';
import {capitalizeFirstLetter} from '../../../stringUtils';
import { Navbar, Container, Nav } from 'react-bootstrap';

const CampaignCategory = ({
    categoryType,
}) => {
    return (
        <h3
            style={{
                color: categoryType === 'education'
                    ? '#70b88f'
                    : categoryType === 'healthcare'
                    ? '#ff7d7d'
                    : ''
            }}
        >
            {capitalizeFirstLetter(categoryType)}
        </h3>
    );
};


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

    onClickScroll(id) {
        let element = document.getElementById(id);
        element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    };

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
                {/* <h3>{
                    // TODO: render with styling, eg. capitalize properly and add icon
                    campaign.category
                }</h3>    */}
                <CampaignCategory categoryType={campaign.category} />
                <h1 style={{color: 'var(--brand-blue'}}>{campaign.title[language]}</h1>  
                <Grid container spacing={4} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={8} id="left-col">
                        {/* left column  */}
                        {/* <hr />*/}
                        {console.log(campaign.image)}
                        <div
                            className="campaign-page-title-img"
                            style={{
                                borderRadius: '20px',
                            }}
                        >
                            <img
                                onClick={this.imgClick}
                                style={{
                                    borderRadius: '20px',
                                }}
                                src={campaign.image}
                                alt="title.img"
                            />
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

                        {/* <hr style={{marginBottom:'-10px'}}/> */}
                        
                        <Navbar>
                            <Container style={{justifyContent: 'center'}}>
                                <Nav className='camp-page-navbar'>
                                    <Nav.Link
                                        href='#1'
                                        onClick={() => {
                                            this.onClickScroll('about')
                                        }}
                                    >About</Nav.Link>
                                    <Nav.Link
                                        href='#2'
                                        onClick={() => {
                                            this.onClickScroll('gallery')}
                                        }
                                    >Gallery</Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>

                        <div className="camp-page-story" id='about'>
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
                            onDonate={this.onClickScroll}
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