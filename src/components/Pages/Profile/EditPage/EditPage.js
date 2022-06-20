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
    const [activeChange, setActiveChange] = React.useState(false);
    const [isSame, setIsSame] = React.useState(false);

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

    function handleChange(e){
        setActiveChange(true)
    }
    
    return (
        <div className='edit-page'>
            <EditPageVisual 
                EN={EN} 
                data={data}
                loading={loading}
                type={TokenService.identifyUserType(data?.user?.role)}
                activeChange={activeChange}
                setIsSame={setIsSame}
            />
        </div>
    );
}

export default EditPage;