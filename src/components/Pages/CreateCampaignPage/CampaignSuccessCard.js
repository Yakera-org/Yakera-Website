import React, { Component } from 'react';
import { Dialog } from '@material-ui/core';

const campaignSuccess = 'https://assets.yakera.org/yakera/campaign-success.webp';

class SuccessCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
    }

    componentDidMount() {
        this.setState({
            loaded: true,
        })
    }

    render() {
        if (!this.state.loaded) {
            return (
                <div>
                    {this.props.EN ? 'Loading' : 'Cargando'}
                </div>
            );
        } else {
            return (
                <>
                    <Dialog
                        fullWidth={true}
                        maxWidth='sm'
                        open={this.props.open}
                        onClose={this.props.onClose}
                    >
                        <div className='col success-card'>
                            <h1>{this.props.EN ? 'Request sent!' : '¡Solicitud enviada!'}</h1>
                            { this.props.isMobile
                            ?
                            <>
                            <div className='success-line'></div>
                            <p>
                                {this.props.EN
                                ?
                                'We review campaigns from 9 am - 5 pm on weekdays. If we need more information to publish it, you will receive a direct message from our team.'
                                :
                                'Revisamos las campañas desde 9 am - 5 pm durante días laborables. Si necesitamos más información para publicarla recibirás un mensaje directo de parte de nuestro equipo.'}
                            </p>
                            <button>
                                {this.props.EN ? 'Ok' : 'Entendido'}
                            </button>
                            </>
                            :
                            <div className='row'>
                                <img src={campaignSuccess} alt='Success' className='success-card-img' />
                                <div className='col'>
                                    <p>
                                        {this.props.EN
                                        ?
                                        'We review campaigns from 9 am - 5 pm on weekdays. If we need more information to publish it, you will receive a direct message from our team.'
                                        :
                                        'Revisamos las campañas desde 9 am - 5 pm durante días laborables. Si necesitamos más información para publicarla recibirás un mensaje directo de parte de nuestro equipo.'}
                                    </p>
                                    <button onClick={this.props.onClose}>
                                        {this.props.EN ? 'Ok' : 'Entendido'}
                                    </button>
                                </div>
                            </div>
                            }
                        </div>
                    </Dialog>
                </>
            );
        }
    }
}

export default SuccessCard;
