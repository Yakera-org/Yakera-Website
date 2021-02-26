import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import ShareCard from './ShareCard';

class DonateCard extends Component {
    render() {
        const amount = this.props.amount;
        const target = this.props.target;
        const language = this.props.language;
        var EN = true;

        if(language ==="en"){
            EN=true
        }else{
            EN=false
        }

        return (
            <div>
                <Card className="donate-page-card">
                    <h1>{EN ? 'Donate now' : 'Done ahora'}</h1>
                    <div >
                        <p>
                            <b>
                                ${amount}
                            </b>
                            &nbsp;{EN ? 'raised of ' : 'levantado de '} ${target} {EN ? ' target' : 'objetivo'}   
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
                        percent={ Math.min(100* amount/target, 100) }/>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block"    
                            onClick={this.props.onDonate}                          
                            >
                            {EN ? 'Donate now' : 'Done ahora'}
                        </button>
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block"
                            onClick={this.props.onShare}
                            >
                            {EN ? 'Share' : 'Cuota'}
                        </button>
                    </div> 
                </Card>

                <ShareCard open={this.props.showShare} onClose={this.props.onClose}/>
            </div>
        );
    }
}

export default DonateCard;