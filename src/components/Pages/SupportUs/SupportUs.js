import React, { useState } from 'react';
import SupportUsVisuals from './SupportUsVisuals'
import PaymentVisual from '../CampaignPage/PaymentVisual'
import * as axios from 'axios'
import './SupportUs.css'
import Author from '../../author'


function SupportUs() {

    const [amount, setAmount] = useState('');
    
    async function AirTM(val, title, name, email){        
        var code = Math.random().toString(36).substring(7);
        const requestBody = {
          "code": code,
          "description": title,
          "cancel_uri": window.location.href,
          "confirmation_uri": "https://www.yakera.net/confirm",
          "amount": val,
          "items": [
            {
              "description": "Yakera donation for: " + title,
              "amount": val,
              "quantity": 1
            }
          ]
        }  
        //sandbox
        //NGRlMWVmYzItYjhlMy00YTA0LTkwYTgtMWUwYmE0MGUyMjkzOjNib0xjQWR4dE1nTW9iOFJuQ0lsUVFiUVZzZ0g2RDcyTVpuWlg5TVNwNVJkMzc5aWU0S3Y3VjZKSXdrWWJId2I=
        //production
        //ZDIyNDNiZmUtNzJlYS00M2EzLThmMGItZmU0NTVlMzU5ZDJhOmdCOHlrUm5iMFlUYmRHUjhuempuWlJEcmFqR3hzakV2d2tEVFR6WlNNNlJnbksxN2xXbnEzck5IWmJPOGtpdUh5YmZ5cTBIMlJuZGtPbmtE
        const config = {
            headers: {
                'Authorization': 'Basic ZDIyNDNiZmUtNzJlYS00M2EzLThmMGItZmU0NTVlMzU5ZDJhOmdCOHlrUm5iMFlUYmRHUjhuempuWlJEcmFqR3hzakV2d2tEVFR6WlNNNlJnbksxN2xXbnEzck5IWmJPOGtpdUh5YmZ5cTBIMlJuZGtPbmtE', 
                'Content-Type': 'application/json',
            }
        }
        const heroku_proxy = "https://shielded-coast-15960.herokuapp.com/";
        const url =  heroku_proxy + "https://payments.air-pay.io/purchases";

        //https://payments.static-stg.tests.airtm.org/purchases
        //https://payments.air-pay.io/purchases

        await axios.post(url, JSON.stringify(requestBody), config)
        .then(res => {
            var id = res.data.id;
            //this.addAmount("AIRTM: " + id, actualValue, name, email).then( () => {
                window.open("https://app.airtm.com/checkout/"+id, "_blank");
                //https://app.stg.airtm.io/checkout/
                //https://app.airtm.com/checkout/
           // })

        })
        .catch(err => {
          //this.onPayPalOff();
          console.log(err)            
        })  
    }
    return (
        <div className='support-us-page'>
            <SupportUsVisuals 
                setAmount={setAmount}
            />
            
            <hr id='support-us-bottom-hr'/>

            <PaymentVisual 
                language='en'
                AirTM={AirTM}
                presetAmount={amount}  
                title={"Yakera support"}
            />

            <Author />
        </div>
    )
}

export default SupportUs
