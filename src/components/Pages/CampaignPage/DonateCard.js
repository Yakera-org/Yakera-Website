import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import ShareCard from './ShareCard';

class DonateCard extends Component {
    render() {
        const amount = this.props.amount;
        const target = this.props.target;
        const language = this.props.language;
        const isAcceptingZelle = this.props.isAcceptingZelle;
        var EN = true;
        
        if(language ==="en"){
            EN=true
        }else{
            EN=false
        }

        return (
            <div>
                <Card
                    className="donate-page-card"
                    style={{
                        borderRadius: '20px',
                        backgroundColor: '#f0f0f0',
                    }}
                >
                    {/* <h1>{EN ? 'Donate now' : 'Done ahora'}</h1> */}
                    <div className='donate-page-card-text'>
                        <p>
                            <b>
                                ${amount}
                            </b>
                            &nbsp;
                            {EN ? 'raised of ' : 'recaudado de '} ${target} {EN ? ' target' : ''}   
                        </p> 
                    </div>
                    <div className="donate-page-card-progress">
                        <Progress theme={{
                            default: {
                                trailColor: 'lightblue',
                                symbol: '',
                                color: '#01224d'
                            }
                        }}
                        status="default"
                        percent={ Math.min((100* (amount/target)).toFixed(2), 100) }/>
                    </div>

                    <div className='donate-page-card-buttons'>
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block"    
                            onClick={() => {
                                this.props.onDonate('donateRef')
                            }}
                            style={{
                                backgroundColor: '#002463'
                            }}                       
                        >
                            {EN ? 'Donate now' : 'Done ahora'}
                        </button>
                        {
                            isAcceptingZelle
                            ?
                            <button
                                type="submit"
                                className="zelle-button-card"
                                onClick={() => {
                                    this.props.onDonate('donateRef')
                                }}
                            >
                                {EN ? <>Zelle <span>NEW!</span></> : <>Zelle <span>¡Nuevo!</span></>}
                            </button>
                            :
                            ""
                        }
                        
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block"
                            onClick={this.props.onShare}
                            style={{
                                borderRadius: '20px',
                            }}  
                        >
                            {EN ? 'Share' : 'Compartir'}
                        </button>
                    </div> 
                </Card>

                <ShareCard open={this.props.showShare} onClose={this.props.onClose} EN={EN}/>
            </div>
        );
    }
}

export default DonateCard;