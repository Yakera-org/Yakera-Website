import React, { PureComponent, Fragment } from 'react';
import {Dialog} from '@material-ui/core';

class PaymentAuth extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            open: true
        }
    }

    onClose(){
        this.setState({
            open:false
        })
    }

    render() {
        return (
            <div>
                <Fragment >
                    <Dialog
                        fullWidth={true} 
                        maxWidth='lg'                                 
                        open={this.state.open}
                        className="share-dialog" 
                        onClose={this.onClose.bind(this)}
                    >           
                        PAYMENT AUTH HERE
                    </Dialog>
                </Fragment> 
            </div>
        )
    }
}

export default PaymentAuth