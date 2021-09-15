import React, {useState} from 'react';
import DashboardVisuals from './DashboardVisuals';
import * as axios from 'axios';
import './Dashboard.css';

function Dashboard() {

    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState('');
    const [profileData, setProfileData] = useState({});
    let token = localStorage.getItem('user');
    const backendUrl = 'https://express-backend-api.herokuapp.com/';

    React.useEffect(() =>{
        if(token){
            getCampaign()
        }else{
            window.location = '/'
        }

    })

    async function getCampaign(){
        const url = backendUrl + 'api/profile';
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        try{
            const res = await axios.get(url, config);
            setProfileData(res.data.data)
            setLoaded(true)
        }
        catch(err){
            setError('Profile not found')
            setLoaded(true)
        }
    }

    async function onWithdraw(event){
        let slug = event.target.name;
        const url = backendUrl + 'api/campaigns/' + slug;
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
          }
        await axios.delete(url, config);

        window.alert('Campaign successfully withdrawn!')
        window.location.reload();
    }

    if (!loaded){
        return(
            <p style={{marginTop:'150px'}}>
                Loading ...
            </p>
        )
    }else if (error){
        return(
            <p style={{marginTop:'150px'}}>
                {error}
            </p>
        )
    }else{        
        return (
            <div className='dashboard-page'>
                <DashboardVisuals data={profileData} onWithdraw={onWithdraw}/>
            </div>
        )
    }
}

export default Dashboard    
