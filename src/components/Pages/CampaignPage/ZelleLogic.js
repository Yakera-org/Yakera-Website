import React, {useState} from 'react';
import ZelleVisual from './ZelleVisual';
import LanguageService from '../../../services/language';

function ZelleLogic(props) {

    const [EN, setEN] = useState(false);



    React.useEffect(() => {
        function startup(){
            if(LanguageService.getLanguage()==='en'){
                setEN(true)
            }
            else {
                setEN(false)
            }
        }
        startup();
    }, []);



    return (
        <div>
            <ZelleVisual EN = {EN} />
        </div>
    );
}

export default ZelleLogic;
