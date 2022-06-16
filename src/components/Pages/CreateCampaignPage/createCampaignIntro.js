import React from "react";
import './CreateCampaignPage.css';


function CampaignIntroPage(props) {
    let EN = props.EN;

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
                    <input type="radio" name="campaigncategory" id="category0" radioGroup="category" onChange={props.handleChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Healthcare" />
                        </div>
                        <div className="panel-body">
                            Content
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category1" radioGroup="category" onChange={props.handleChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Education" />
                        </div>
                        <div className="panel-body">
                            Content
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category2" radioGroup="category" onChange={props.handleChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Small Business" />
                        </div>
                        <div className="panel-body">
                            Content
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category3" radioGroup="category" onChange={props.handleChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <img src="" alt="Nutrition" />
                        </div>
                        <div className="panel-body">
                            Content
                        </div>
                    </div>
                </label>
            </div>
        </div>
        {/*[EN ? 'Healthcare' : 'Salud',
            EN ? 'Education' : 'Educación',
            EN ? 'Small Business' : 'Pequeños negocios',
            EN ? 'Nutrition' : 'Alimentación'].map((val, index) => (
            <FormCheck
                key={index}
                name={'campaigncategory'}
                value={val.toLowerCase()}
                type='radio'
                id={`category${index}`}
                label={val}
                group='category'
                // defaultChecked= {props.data.campaignCategory}
                onChange={props.handleChange}
            />
        ))*/}
    </div>
    )
}

export default CampaignIntroPage;
