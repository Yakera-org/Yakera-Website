import React, { Component } from 'react';
import {Dialog, Grid} from '@material-ui/core';
import DonateCard from './DonateCard';
import {capitalizeFirstLetter} from '../../../stringUtils';
import { Navbar, Container, Nav } from 'react-bootstrap';
import getHumanReadableDate from '../../../dateUtils';

const CampaignCategory = ({
    categoryType,
}) => {
    return (
        <h3
            style={{
                color: categoryType === 'education' || 'educación'
                    ? '#70b88f'
                    : categoryType === 'healthcare' || 'salud'
                    ? '#ff7d7d'
                    : categoryType === 'small business' || 'pequeños negocios'
                    ? '#0e325e'
                    : categoryType === 'nutrition' || 'alimentación'
                    ? '#edc343'
                    : ''
            }}
        >
            {capitalizeFirstLetter(categoryType)}
        </h3>
    );
};

const categories = {
    'en': {
        'small_business': 'small business',
        'healthcare': 'healthcare',
        'education': 'education',
        'nutrition': 'nutrition',
    },
    'es': {
        'small_business': 'pequeños negocios',
        'healthcare': 'salud',
        'education': 'educación',
        'nutrition': 'alimentación',
    }
}


var marginOffset = 50;

class CampaignPageVisual extends Component {

    constructor(props) {
        super(props);
        this.state = {
            marginCard:marginOffset,
            showShare:false,
            imgClicked: false,
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
                    var lowerBoundary = document.getElementById('left-col').offsetHeight - 800;
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
        var EN = true;
        const language = this.props.language;

        if(language ==="en"){
            EN=true
        }else{
            EN=false
        }
        const campaign = this.props.campaign;
        const amount = this.props.amount;
        const target = campaign.targetAmount;
        let title, story, mainPicture, category;

        try {
            category = categories[language][campaign.category]
        } catch (err) {
            category = campaign.category
        }
        
        try{
            mainPicture = campaign.mainPicture.url;
        }
        catch{
            mainPicture = ''
        }

        try {
            title = campaign.translations[language].title;
            story = campaign.translations[language].story;
        } catch (err) {
            title = campaign.title;
            story = campaign.story;
        }
        return (
            <div className = "camp-page-vis">
                {/* <h3>{
                    // TODO: render with styling, eg. capitalize properly and add icon
                    campaign.category
                }</h3>    */}
                <CampaignCategory categoryType={category} />
                    <h1 style={{color: 'var(--brand-blue'}}>{title}</h1>  
                <Grid container spacing={4} style={{ alignItems:'flex-start'}}>
                    <Grid item xs={12} sm={8} id="left-col">
                        {/* left column  */}
                        {/* <hr />*/}
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
                                src={mainPicture}
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
                                    src={mainPicture} 
                                    alt="title.img"
                                />
                            </Dialog>
                             
                        </div>

                        <p id="author-credit">{capitalizeFirstLetter(campaign._user.firstName)} {capitalizeFirstLetter(campaign._user.lastName)} - {getHumanReadableDate(campaign.createdAt)}</p>

                        {/* <hr style={{marginBottom:'-10px'}}/> */}
                        
                        <Navbar>
                            <Container style={{justifyContent: 'center'}}>
                                <Nav className='camp-page-navbar'>
                                    <Nav.Link
                                        href='#1'
                                        onClick={() => {
                                            this.onClickScroll('about')
                                        }}
                                    >
                                        {EN ? 'About' : 'Sobre'}
                                    </Nav.Link>
                                    <Nav.Link
                                        href='#2'
                                        onClick={() => {
                                            this.onClickScroll('gallery')}
                                        }
                                    >
                                        {EN ? 'Gallery' : 'Galería'}
                                    </Nav.Link>
                                </Nav>
                            </Container>
                        </Navbar>

                        <div className="camp-page-story" id='about'>
                            <p dangerouslySetInnerHTML={{ __html: story }} />
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
                         <div className='comment-section'>
                             <h2>
                                 Recent donations
                             </h2>
                             <div >
                                <Grid container spacing={0} className='ind-comment'>
                                    <Grid item xs={2} sm={2} className='img-wrapper'>
                                        <img src='https://assets.yakera.org/yakera/illustration-aboutus-3.png' alt='comment-profile' />
                                    </Grid>
                                    <Grid item xs={10} sm={10} >
                                        <div className='cmt-wrapper'>
                                            <h3 className='name'>
                                                Luisa Perez, $50
                                            </h3>
                                            <p className='comment'>
                                                Vamos Yakera!
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} className='ind-comment'>
                                    <Grid item xs={2} sm={2} className='img-wrapper'>
                                        <img src='https://assets.yakera.org/yakera/illustration-aboutus-3.png' alt='comment-profile' />
                                    </Grid>
                                    <Grid item xs={10} sm={10} >
                                        <div className='cmt-wrapper'>
                                            <h3 className='name'>
                                                Luisa Perez, $50
                                            </h3>
                                            <p className='comment'>
                                                Vamos Yakera!
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} className='ind-comment'>
                                    <Grid item xs={2} sm={2} className='img-wrapper'>
                                        <img src='https://assets.yakera.org/yakera/illustration-aboutus-3.png' alt='comment-profile' />
                                    </Grid>
                                    <Grid item xs={10} sm={10} >
                                        <div className='cmt-wrapper'>
                                            <h3 className='name'>
                                                Luisa Perez, $50
                                            </h3>
                                            <p className='comment'>
                                                Vamos Yakera!
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0} className='ind-comment'>
                                    <Grid item xs={2} sm={2} className='img-wrapper'>
                                        <img src='https://assets.yakera.org/yakera/illustration-aboutus-3.png' alt='comment-profile' />
                                    </Grid>
                                    <Grid item xs={10} sm={10} >
                                        <div className='cmt-wrapper'>
                                            <h3 className='name'>
                                                Luisa Perez, $50
                                            </h3>
                                            <p className='comment'>
                                                Vamos Yakera!
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>

                             </div> 
                         </div>
                             
                        
                    </Grid>
                    
                </Grid>

            </div>
        );
    }
}

export default CampaignPageVisual;