import React, { PureComponent, Fragment } from 'react';
import {Dialog, Card} from '@material-ui/core';

class PaymentAuth extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
        }
    }

    render() {

        const language = this.props.language;
        var EN = true;
        if(language !=="en"){
            EN = false
        }
        return (
            <div>
                <Fragment >
                    <Dialog
                        fullWidth={true} 
                        maxWidth='lg'                                 
                        open={true}
                        className="payment-auth" 
                        onClose={this.props.onClose}
                    >           
                        <Card className='payment-auth-card'>
                            
                            PAYMENT AUTH HERE
                            Amount: {this.props.amount}

                        </Card>

                    </Dialog>
                </Fragment> 
            </div>
        )
    }
}

export default PaymentAuth