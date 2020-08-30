import React, { Component,Fragment } from 'react';
import  { Box, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Grid, Card, CardContent, TextField, CardMedia, Drawer, Button, Typography} from '@material-ui/core';
import GenerateRandomCode from 'react-random-code-generator';
import axios from 'axios';
import logo from '../../../pics/logo.png';

const PROXY_URL = 'https://cors-anywhere.herokuapp.com/';
const URL = 'https://payments.static-stg.tests.airtm.org/purchases';
const airtmCheckout = 'https://payments.static-stg.tests.airtm.org/checkout/';

const token = 'NGRlMWVmYzItYjhlMy00YTA0LTkwYTgtMWUwYmE0MGUyMjkzOjNib0xjQWR4dE1nTW9iOFJuQ0lsUVFiUVZzZ0g2RDcyTVpuWlg5TVNwNVJkMzc5aWU0S3Y3VjZKSXdrWWJId2I=';


class CardForDonation extends Component{  
    constructor(props) {
        super(props);
        this.state = {
            amount: null,
            isLoaded: false,
            open: false            
        }
      }   

      
      generateCode(){
        return GenerateRandomCode.NumCode(10);        
        };

      handleOnChange = (event) => {
          if(event.target.value){
              this.setState({amount: event.target.value})
          }
      }
      handleToggle = () => {
        this.setState({
          open : !this.state.open
        })
      }

      donate = (name) => {
          
        axios({
            method: 'post',
            
                headers: {
                  'Authorization': `Basic ${token}` 
                },
                data: {
                    "code": this.generateCode(),
                    "description": `YAKERA donation for ${name}`,
                    "cancel_uri": "http://localhost:3000/cancelled",
                    "confirmation_uri": "http://localhost:3000/confirmed",
                    "amount": this.state.amount,
                    "items": [
                      {
                        "description": `YAKERA donation for ${name}`,
                        "amount": this.state.amount,
                        "quantity": 1
                      }                  
                    ]
                  },
              
            url: PROXY_URL+URL, 
            
          })
          .then(response => {
            window.open(airtmCheckout +  response.data.id , "_blank");
                
              })
          .catch(err => console.log(err));
          
      }
      
    render(){
     
      const { open } = this.state
        return(
          <div
            hidden={this.props.value !== this.props.index}                     
          > 
            <Card style={{margin:'2% 2% 2% 20%'}} >
                <Grid container spacing={4}>
                    <Grid item>
                    <CardMedia
                            style = {{ height: '200px', width:'200px'}}
                            image={logo}    
                            title="picture"
                            />
                    </Grid>

                    <Grid item xs={8}>                   
                        <CardContent>
                            <Typography component="h5" variant="h5">
                            {this.props.name} needs {this.props.cause}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                            help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                            </Typography>
                            <div>
                                
                                <Button style={{background: '#ef6c6c',marginTop:'30%', height:'70px'}} variant="contained" onClick={this.handleToggle} >Description</Button>
                                                          
                                <Fragment >
                                  <Dialog
                                      fullWidth={true} 
                                      maxWidth='lg'                                 
                                      open={open}
                                      onClose={this.handleToggle}
                                      style={{maxHeight:'100%', marginTop:'1%'}}                                                                                                          
                                    >
                                      
                                      <DialogTitle style={{marginTop:'2%', marginLeft:'2%'}} >{this.props.name} needs {this.props.cause}</DialogTitle>
                                      <Box display="flex"
                                            flexWrap="nowrap"
                                            
                                            bgcolor="background.paper"
                                            css={{ maxWidth: '100%' }}>
                                      <DialogContent
                                      style={{marginLeft:'5%'}}>
                                        <DialogContentText >
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}help {this.props.name} and his family by donating money that he can use to buy {this.props.cause}
                                        </DialogContentText>
                                      </DialogContent>
                                      <img src={logo} style={{ marginRight:'5%',height:'30%', width:'30%'}}></img>
                                      </Box>
                                        
                                      <div >
                                          <TextField 
                                          
                                          variant="outlined"
                                          type="number"
                                          color="primary"
                                          label="Amount"
                                          onChange={this.handleOnChange}
                                          style={{ width:'200px' ,height: '50px', marginLeft:'5%'}}
                                          >
                                            Amount
                                          </TextField>
                                        <Button
                                          id={this.props.name}
                                          variant="contained"
                                          onClick={() => this.donate(this.props.name)}
                                          style={{width:'200px',height: '50px', marginLeft:'5px', backgroundColor: 'orange'}}
                                          >
                                            Donate now
                                          </Button>
                                        </div>
                                      <DialogActions 
                                        disableSpacing={false}
                                        >
                                        <Button style={{backgroundColor:'black', marginRight:'2%', marginBottom:'2%'}} onClick={this.handleToggle} variant="contained" color="primary">
                                          return
                                        </Button>                                    
                                      </DialogActions>
                                    </Dialog>
                                  </Fragment>
                            </div>
                        </CardContent>                    
                    </Grid>

                </Grid>                
            </Card>
          </div>

        )
    }
}
            
export default CardForDonation;