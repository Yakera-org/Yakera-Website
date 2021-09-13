import React, {useEffect, useState} from 'react';
import DashboardVisuals from './DashboardVisuals';
import * as axios from 'axios';
import './Dashboard.css';

function Dashboard() {

    const [loaded, setLoaded] = useState(false);
    const [profileData, setProfileData] = useState({});

    const backendUrl = 'https://express-backend-api.herokuapp.com/';
    const tempAuthToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxMTM1OWExZGE4MTI0MDAwNDc5OGUyOSIsImlhdCI6MTYzMTQxMjI5Nn0.AaOAzUfKvuIyL2j6VSjI0DtCRb7W3nck7ohfxFCu3TE';

    React.useEffect(() =>{
        getCampaign()
    }, [])

    async function getCampaign(){
        const url = backendUrl + 'api/profile';
        let config = {
            headers: {
              'Authorization': 'Bearer ' + tempAuthToken
            }
          }
        const res = await axios.get(url, config);

        setProfileData(res.data.data)
        setLoaded(true)
    }

    if (!loaded){
        return(
            <p style={{marginTop:'150px'}}>
                Loading ...
            </p>
        )
    }else{        
        return (
            <div className='dashboard-page'>
                <DashboardVisuals data={profileData}/>
            </div>
        )
    }
}

export default Dashboard    
