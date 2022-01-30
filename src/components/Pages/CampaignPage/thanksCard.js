import React, { Component, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import {Dialog, Grid, Hidden} from '@material-ui/core';
import { Link } from 'react-router-dom';

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
            loaded: true,
        })


    }


    render(){
        var token = localStorage.getItem('accessToken');
        var loggedIn = false;

        if(token === null){
          loggedIn = true;
        }
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
                <div className='close-icon' onClick={this.props.onClose} style = {{color:"#252525", float: "right"}}>
                    <i className="fas fa-2x fa-times"></i>
                </div>
                </div>

                <Grid container
                 spacing={0}
                 bgcolor= "#fbefe2"
                 className = "thanks-grid"
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

                                  <b  style={{fontSize:'23px'}}>{this.props.title} </b>
                          </p>

                          <a
                              href="https://form.jotform.com/212647238863160"
                              title="Feedback"

                          ><br/>
                              {this.props.EN ? <b style={{ color: "#ea8737" }}>Click here to leave us feedback! </b>
                              :
                                <b style={{ color: "#ea8737" }}>Haz click aquí para dejarnos tu feedback! </b>
                              }

                          </a><br/><br/>

                          {loggedIn &&
                          <Button clasName = "thanks-button"
                              component={Link}
                              to="/register"
                              style={{
                              margin:'10px',
                              width:'65%',
                              // marginLeft:'25%',
                              border:'none',
                              backgroundColor:'#ea8737',
                              borderRadius:'30px',
                              color:'white',
                              padding:'10px',
                              fontSize: '13px',

                          }}>
                              <a style = {{fontFamily: 'Intro-Regular-Alt'}}>Create an Account</a>
                          </Button>
                          }
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
