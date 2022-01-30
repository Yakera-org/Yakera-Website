import React, { Component, Fragment } from 'react';
import {Dialog, Grid, Hidden} from '@material-ui/core';

class ThanksCard extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        }
        // console.log(this.state.EN);
    }
    componentDidMount() {
        this.setState({
            loaded: true
        })
    }


    render(){

        if (!this.state.loaded) {
            return (
                <div>
                    Loading
                </div>
            )
        } else {
        return(
            <Fragment >
                <Dialog
                    fullWidth={true}
                    maxWidth='lg'
                    open={this.props.open}
                    onClose={this.props.onClose}
                    className="thanks-dialog"

                >
                <div style = {{backgroundColor : "#fbefe2"}}>
                <div className='close-icon' onClick={this.props.onClose} style = {{float: "right"}}>
                    <i className="fas fa-2x fa-times"></i>
                </div>
                </div>

                <Grid container
                 spacing={0}
                 bgcolor= "#fbefe2"
                 style = {{backgroundColor : "#fbefe2", padding: "0px 60px 30px 60px"}}
                >

                      <Grid container
                          spacing={0}
                          direction="column"
                          alignItems="center"
                          justifyContent="center"
                          style={{ minHeight: '30vh' }}
                          sm = {6}
                          item={true}
                      >

                          <div>

                          <h1 style={{marginTop:'10px', color:'#ea8737'}}> {this.props.EN ? <b>Thank you!</b> : <b>Gracias!</b>}</h1>
                          <br/>
                          <p style = {{color : "#ea8737"}}>
                              {this.props.EN ?
                                <a>Yakera means gratitude in Warao,<br/> and we send you gratitude!</a>
                                    :
                                <a>Yakera significa gratitud en warao,<br/> y te mandamos nuestra Yakera</a>
                              }
                          </p>

                          <hr width = "50%" color = "#ea8737"/>

                          <p>

                              {this.props.EN ? 'Thank you for your donation of ' : 'Gracias por tu donación de '}

                                  <b>
                                      ${this.props.amount}
                                  </b>
                                  {this.props.EN ? ' to the campaign: ' : ' A la campaña: '} <br/>

                                  <b  style={{fontSize:'20px'}}>{this.props.title} </b>
                          </p>

                          <a
                              href="https://form.jotform.com/212647238863160"
                              title="Feedback"

                          ><br/>
                              {this.props.EN ? <b style={{ color: "#FF9800" }}>Click here to leave us feedback! </b>
                              :
                                <b style={{ color: "#FF9800" }}>Haz click aquí para dejarnos tu feedback! </b>
                              }

                          </a><br/><br/>

                          <button onClick={this.props.onClose} style={{
                              width:'50%',
                              margin:'10px',
                              // marginLeft:'25%',
                              border:'none',
                              backgroundColor:'#ea8737',
                              borderRadius:'30px',
                              color:'white',
                              padding:'10px',
                              fontSize: '13px'
                          }}>
                            {true ?
                              'Create an Account'
                                  :
                              'Crear una Cuenta'
                            }
                          </button>
                          </div>

                      </Grid>
                    <Hidden xsDown>
                    <Grid container
                        spacing={0}
                        // direction="column"
                        alignItems="center"
                        justifyContent="center"
                        style={{ minHeight: '50vh' }}
                        sm = {6}
                        item={true}
                    >
                        <img src='https://assets.yakera.org/yakera/illustration-share.webp' alt='gratitudImage' width = "90%"/>

                    </Grid>
                    </Hidden>

                </Grid>
                </Dialog>
            </Fragment>
        )
    }}
}

export default ThanksCard;
