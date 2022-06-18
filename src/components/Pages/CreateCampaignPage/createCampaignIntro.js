import React from "react";
import './CreateCampaignPage.css';


function CampaignIntroPage(props) {
    let EN = props.EN;

    const handleRadioChange = event => {
        const cat0 = document.getElementById('text-category0');
        const cat1 = document.getElementById('text-category1');
        const cat2 = document.getElementById('text-category2');
        const cat3 = document.getElementById('text-category3');

        const unsetClass = element => {
            if(element.classList.contains('radio-title-checked'))
                element.classList.toggle('radio-title-checked');
        };

        unsetClass(cat0);
        unsetClass(cat1);
        unsetClass(cat2);
        unsetClass(cat3);

        const selected = document.getElementById(`text-${event.target.id}`);
        selected.classList.toggle('radio-title-checked');

        return props.handleChange(event);
    }

    return(
    <div>
        <h1>{EN ? 'Create your Campaign' : 'Crea tu Campaña'}</h1>
        {/* Replace the empty source with the campaign image when ready */}
        <img src="" alt="Campaign Creation" />
        <p className="info-text">
            {EN
            ?
            'If you have any questions, send a Whatsapp to the number '
            :
            'Si tienes dudas, envía un Whatsapp al número '}
            <span className="info-highlight">+1 (740) 324-9244</span>
            {EN
            ?
            ' o envía un correo electrónico a '
            :
            ' or send an email to '}
            <span className="info-highlight">info@yakera.org</span>
        </p>

        <h2 className="details-text">{EN ? 'Details' : 'Detalles'}</h2>
        <hr />
        <p className="category-label">{EN ? 'Campaign Category' : 'Categoría de campaña'}</p>
        <div className="row">
            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category0" radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Healthcare" />
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category0">{EN ? 'Healthcare' : 'Salud'}</p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category1" radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Education" />
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category1">{EN ? 'Education' : 'Educación'}</p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category2" radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Small Business" />
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category2">{EN ? 'Small Business' : 'Pequeños Negocios'}</p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category3" radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Nutrition" />
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category3">{EN ? 'Nutrition' : 'Nutrición'}</p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
    </div>
    )
}

export default CampaignIntroPage;
