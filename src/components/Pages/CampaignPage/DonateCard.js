import React, { Component } from 'react';
import  { Card } from '@material-ui/core';
import { Progress } from 'react-sweet-progress';

class DonateCard extends Component {
    render() {
        return (
            <div>
                <Card>
                    <h1>Donate now</h1>
                    <div >
                        <p>
                            <b>
                                $100 
                            </b>
                            raised of $200 target   
                        </p> 
                    </div>
                    <div >
                        <Progress theme={{
                            default: {
                                trailColor: 'lightblue',
                                symbol: '',
                                color: '#01224d',
                                overflow:'visible'
                            }
                        }}
                        status="default"
                        percent={20}/>
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
                            >
                            Share
                        </button>
                    </div> 
                </Card>
            </div>
        );
    }
}

export default DonateCard;