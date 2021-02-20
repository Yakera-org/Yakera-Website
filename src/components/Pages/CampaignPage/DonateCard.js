import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';
import ShareCard from './ShareCard';

class DonateCard extends Component {
    render() {
        const amount = this.props.amount;
        const target = this.props.target;

        return (
            <div>
                <Card className="donate-page-card">
                    <h1>Donate now</h1>
                    <div >
                        <p>
                            <b>
                                ${amount}
                            </b>
                            &nbsp;raised of ${target} target   
                        </p> 
                    </div>
                    <div className="donate-page-card-progress">
                        <Progress theme={{
                            default: {
                                trailColor: 'lightblue',
                                symbol: '',
                                color: '#01224d',
                                overflow:'visible'
                            }
                        }}
                        status="default"
                        percent={ 100* amount/target }/>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block"                              
                            >
                            Donate now
                        </button>
                        <button
                            type="submit"
                            className="btn btn-secondary btn-block"
                            onClick={this.props.onShare}
                            >
                            Share
                        </button>
                    </div> 
                </Card>

                <ShareCard open={this.props.showShare} onClose={this.props.onClose}/>
            </div>
        );
    }
}

export default DonateCard;