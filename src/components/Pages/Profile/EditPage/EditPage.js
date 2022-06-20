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
        switch(e.target.name){
            case "phone":
            case "address":
            case "reserveUsername":
                setData({
                        ...data,
                        user:{
                            ...data.user,
                            [e.target.name]: e.target.value
                        }
                    })
                break;
            case "email":
            case "name":
                setData({
                    ...data,
                    user:{
                        ...data.user,
                        zelleInfo:{
                            ...data.user.zelleInfo,
                            [e.target.name]: e.target.value
                        }
                    }
                })
            break;
            case "acceptZelle":
                setData({
                    ...data,
                    user:{
                        ...data.user,
                        zelleInfo:{
                            ...data.user.zelleInfo,
                            isAccepting: !data.user?.zelleInfo?.isAccepting
                        }
                    }
                })
            break;
            case "location":
            case "age":
            case "bio":
                setData({
                    ...data,
                    user:{
                        ...data.user,
                        donorInfo:{
                            ...data.user.donorInfo,
                            [e.target.name]: e.target.value
                        }
                    }
                })
                break;
            default:
                break;
        }
    }

    function onSubmit(){
        console.log(data)
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
                onSubmit={onSubmit}
                handleChange={handleChange}
            />
        </div>
    );
}

export default EditPage;