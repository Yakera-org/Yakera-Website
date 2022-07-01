import React, { useState, useEffect } from 'react';
import LanguageService from '../../../../services/language';
import api from "../../../../services/api";
import { userServices } from '../UserService';
import TokenService from '../../../../services/token';
import { validateFields } from '../../../../services/Validation';
import SwitchAccountPageVisual from './SwitchAccountPageVisual';

const SwitchAccountPage = () => {
    const [EN, setEN] = useState(false);
    const [data, setData] = React.useState({});
    const [loading, setLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [activeChange, setActiveChange] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setEN(LanguageService.getLanguage() === 'en');
        getUser();
    }, []);

    const getUser = async () => {
        try {
            const user = await userServices.getUserData();
            setData(user);
        } catch (errors) {
            userServices.timedOut();
        } finally {
            setLoading(false);
        }
    };




    return (
        <div className='switch-account-page'>
            <SwitchAccountPageVisual
                EN={EN}
                data={data}
                loading={loading}
                submitLoading={submitLoading}
                type={TokenService.identifyUserType(data?.user?.role)}
                activeChange={activeChange}
                onSubmit={onSubmit}
                handleChange={handleChange}
                success={success}
                error={error}
            />
        </div>
    );
};

export default SwitchAccountPage;