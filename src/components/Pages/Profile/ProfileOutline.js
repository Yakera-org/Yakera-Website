import React from 'react';
import HashLoader from "react-spinners/HashLoader";

const bannerBig = 'https://assets.yakera.org/yakera/banner-donorhub-large.svg';
const banner = 'https://assets.yakera.org/yakera/banner-donorhub-big.svg';

function ProfileOutline(props) {
    const EN = props.EN
    const data = props.data
    const user = data.user
    const loading = props.loading

    return (
        <div className="profile-page">
            <section className='banner'>
                <img src={window.innerWidth < 600 ? bannerBig : banner} alt="banner-img" />
            </section>
           {loading ?
            //loader
            <div className="loader-wrapper">
                <HashLoader
                    size={80}
                    color={"#ea8737"}
                    loading={true}
                    />
            </div>
           :
            <div className='profile-content'>
                <section className='profile-stats'>
                    {user.firstName}
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