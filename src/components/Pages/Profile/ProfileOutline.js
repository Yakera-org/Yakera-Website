import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import DashboardContent from './Dashboard/DashboardContent';
import DashboardStats from './Dashboard/DashboardStats';
import DonorHubContent from './DonorHub/DonorHubContent';
import DonorHubStats from './DonorHub/DonorHubStats';

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
                    <button className='edit-button' onClick={()=>window.location.href="/profile/edit"}>
                        {EN ? 'Edit profile' : 'Editar perfil'}
                    </button>
                </section>

                <hr />
            
                <section className='profile-main'>
                    {userType === "recipient"
                    ?
                    <DashboardContent data={data} EN={EN} onWithdraw={props.onWithdraw}/>
                    :
                    <DonorHubContent data={data} EN={EN} />
                    }
                </section>
            </div>
            }
        </div>
    );
}

export default ProfileOutline;