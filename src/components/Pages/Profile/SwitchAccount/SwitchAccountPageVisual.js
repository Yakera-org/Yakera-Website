import React, { useState, useEffect } from 'react';
import HashLoader from "react-spinners/HashLoader";
import SwitchAccountContent from './SwitchAccountContent';

const SwitchAccountPageVisual = ({
    EN,
    data,
    loading,
    submitLoading,
    type,
    activeChange,
    onSubmit,
    handleChange,
    success,
    error,
}) => {

    return (
        <div className='switch-account-container'>
            <section className='banner'>
                {EN ? ' Switch Account Types' : ' '}
            </section>
            <div className='sub-banner'>
                <a href='/profile'>
                    <i className="fas fa-arrow-left"></i>
                    {EN ? ' Return' : ' Volver'}
                </a>
            </div>

            {loading
            ? 
            <div className='loader-wrapper'>
                <HashLoader
                    size={60}
                    color={'#ea8737'}
                    loading={true}
                />
            </div>
            :
            <>
                <SwitchAccountContent 
                    EN={EN}
                    user={data.user}
                    type={type}
                    handleChange={handleChange}
                />
            </>
            }
        </div>
    )
};

export default SwitchAccountPageVisual;