import React from 'react';
import EditPageVisual from './EditPageVisual';
import LanguageService from '../../../../services/language';
import "./EditPage.scss"
import { userServices } from '../UserService';
import TokenService from '../../../../services/token';

function EditPage() {

    const [EN, setEN] = React.useState(false);
    const [data, setData] = React.useState({});
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        setEN(LanguageService.getLanguage()==='en')
        getUser()
    }, [])

    async function getUser() {
        try {
            const user = await userServices.getUserData()
            setData(user)
        } catch (errors) {
            userServices.timedOut()
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className='edit-page'>
            <EditPageVisual 
                EN={EN} 
                data={data}
                loading={loading}
                type={TokenService.identifyUserType(data?.user?.role)}
            />
        </div>
    );
}

export default EditPage;