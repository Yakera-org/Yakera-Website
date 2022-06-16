import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import DashboardStats from './DashboardStats';
import DonorHubStats from './DonorHubStats';

const bannerBig = 'https://assets.yakera.org/yakera/banner-donorhub-large.svg';
const banner = 'https://assets.yakera.org/yakera/banner-donorhub-big.svg';

function ProfileOutline(props) {
    const EN = props.EN
    const data = props.data
    const user = data.user
    const loading = props.loading
    const userType = props.type


    return (
        <div className="profile-page">
            <section className='banner'>
                <img src={window.innerWidth < 600 ? bannerBig : banner} alt="banner-img" />
            </section>
           {loading ?
            //loader
            <div className="loader-wrapper">
                <HashLoader
                    size={60}
                    color={"#ea8737"}
                    loading={true}
                    />
            </div>
           :
            <div className='profile-content'>
                <section className='profile-stats'>
                    {userType === "recipient"
                    ?
                    <DashboardStats user={user} EN={EN} />
                    :
                    <DonorHubStats user={user} EN={EN} />
                    }
                </section>

                <hr />
            
                <section className='profile-main'>
                    campaigns, ...
                </section>
            </div>
            }
        </div>
    );
}

export default ProfileOutline;