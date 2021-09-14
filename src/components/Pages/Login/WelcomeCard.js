import React, { Component, Fragment } from 'react';
import {Dialog} from '@material-ui/core';


class Thankscard extends Component{  
    render(){ 
        return(
            <Fragment >
                <Dialog
                    maxWidth='lg'                                 
                    open={this.props.open}
                    className="welcome-dialog"  
                                                                                                                                    
                >
                    <section>
                        <h2>Login successfull, welcome to Yakera!</h2>
                        <p>Head to the <a href='../dashboard'>Dashboard</a></p>
                    </section>

                </Dialog>
                </Fragment>                   
        )
    }
}

export default Thankscard;