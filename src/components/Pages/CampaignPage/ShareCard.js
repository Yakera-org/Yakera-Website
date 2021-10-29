import React, { Component, Fragment } from 'react';
import { Dialog, Grid } from '@material-ui/core';
import classnames from 'classnames';
import { FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton, TwitterIcon, TwitterShareButton, EmailIcon, EmailShareButton } from 'react-share'

import './sharecard.css';

class ShareCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false,
            loaded: false,
            EN: this.props.EN
        }
        this.hanldeCopy = this.hanldeCopy.bind(this);
    }

    hanldeCopy() {
        navigator.clipboard.writeText(window.location.href);
        this.setState({
            copied: true
        })
    }
    componentDidMount() {
        this.setState({
            loaded: true,
            copied: false
        })
    }
    render() {
        let copied;
        const EN = this.state.EN

        if (this.state.copied) {
            copied = <p className="copied">{EN ? 'Copied!' : 'Copia!'}</p>
        }
        if (!this.state.loaded) {
            return (
                <div>
                    Loading
                </div>
            )
        } else {

            return (
                <Fragment >
                    <Dialog
                        fullWidth={true}
                        maxWidth='lg'
                        open={this.props.open}
                        onClose={this.props.onClose}
                        className="share-dialog"

                    >

                        <h1 >{EN ? 'Multiply your impact' : 'Multiplica tu impacto'}</h1>
                        <p id="share-help">
                            {EN ? 'Tell your friends & family to pitch in!' : '¡Comentale a tu familia y amigos que te den una mano!'}
                        </p>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} className='social-media'>
                                <FacebookShareButton url={window.location.href} quote={EN ? 'Please help me spread the word and chip in!' : 'Por favor ayudame a compartir la camapaña y contribuye!'} className='social-button'>
                                    <FacebookIcon size={50} logoFillColor='white' round={true} />
                                </FacebookShareButton>
                                <WhatsappShareButton url={window.location.href} className='social-button'>
                                    <WhatsappIcon size={50} logoFillColor='white' round={true} />
                                </WhatsappShareButton>
                                <TwitterShareButton url={window.location.href} className='social-button'>
                                    <TwitterIcon size={50} logoFillColor='white' round={true} />
                                </TwitterShareButton>
                                <EmailShareButton url={window.location.href} className='social-button'>
                                    <EmailIcon size={50} logoFillColor='white' round={true} />
                                </EmailShareButton>
                            </Grid>
                            <Grid item xs={6} sm={6}>
                                <input
                                    type="text"
                                    name="share-url"
                                    readOnly={true}
                                    value={window.location.href}
                                    className={classnames(
                                        'form-control'
                                    )}
                                    style={{ marginLeft: '55%', marginBottom: '15px', width: '60%' }}
                                    onClick={this.hanldeCopy}
                                />
                            </Grid>
                            <Grid item xs={3} sm={3}>
                                <button
                                    type="submit"
                                    className="btn btn-secondary btn-block copy-btn"
                                    style={{ marginLeft: '35%', width: '50%' }}
                                    onClick={this.hanldeCopy}
                                >
                                    {EN ? 'Copy!' : 'Copia!'}
                                </button>
                            </Grid>
                            {copied}
                            <Grid item xs={12}>
                                <div>
                                    <img src='https://assets.yakera.org/yakera/illustration-email.png' alt='gratitudImage' className='share-img' />
                                    <img src='https://assets.yakera.org/yakera/pattern-email.png' alt='gratitud' className='share-img-2' />
                                </div>
                            </Grid>
                        </Grid>
                    </Dialog>
                </Fragment>
            )
        }
    }
}

export default ShareCard;