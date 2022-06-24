import React, { useState, useEffect } from "react";
import './CreateCampaignPage.css';
import campaignImgEs from '../../../pics/campaign-img-es.png';
import campaignImgEn from '../../../pics/campaign-img-en.png';
import healthcare from '../../../pics/healthcare-campaign.png';
import education from '../../../pics/education-campaign.png';
import smallbusiness from '../../../pics/smallbusiness-campaign.png';
import nutrition from '../../../pics/nutrition-campaign.png';


function CampaignIntroPage(props) {
    let EN = props.EN;

    const [width, setWidth] = useState(window.innerWidth);

    let isMobile = width < 700 ? true : false;

    const handleWindowSize = () => {
        setWidth(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener('resize', handleWindowSize);

        return () => {
            window.removeEventListener('resize', handleWindowSize);
        };
    }, []);

    const handleRadioChange = event => {
        const cat0 = document.getElementById('text-category0');
        const cat1 = document.getElementById('text-category1');
        const cat2 = document.getElementById('text-category2');
        const cat3 = document.getElementById('text-category3');

        const bdy0 = document.getElementById('body-category0');
        const bdy1 = document.getElementById('body-category1');
        const bdy2 = document.getElementById('body-category2');
        const bdy3 = document.getElementById('body-category3');

        const unsetClass = element => {
            if(element.classList.contains('radio-title-checked'))
                element.classList.toggle('radio-title-checked');
        };

        const setHidden = element => {
            if(!element.classList.contains('radio-body-hidden'))
                element.classList.toggle('radio-body-hidden');
        };

        unsetClass(cat0);
        unsetClass(cat1);
        unsetClass(cat2);
        unsetClass(cat3);

        setHidden(bdy0);
        setHidden(bdy1);
        setHidden(bdy2);
        setHidden(bdy3);

        const selected = document.getElementById(`text-${event.target.id}`);
        selected.classList.toggle('radio-title-checked');
        const body = document.getElementById(`body-${event.target.id}`);
        body.classList.toggle('radio-body-hidden');

        return props.handleChange(event);
    }

    return(
    <div>
        <h1>{EN ? 'Create your Campaign' : 'Crea tu Campaña'}</h1>
        <div className="center-img">
            <img src={EN ? campaignImgEn : campaignImgEs} alt="Campaign Creation" className="campaign-img" />
        </div>
        { isMobile
        ?
        ''
        :
        <p className="info-text">
            {EN
            ?
            'If you have any questions, text us in Whatsapp at '
            :
            'Si tienes dudas, envía un Whatsapp al número '}
            <span className="info-highlight">+1 (740) 324-9244</span>
            {EN
            ?
            ' or '
            :
            ' o al '}
            <span className="info-highlight">+56 9 5699 7352</span>
            {EN
            ?
            ' or send an email to '
            :
            ' o envía un correo electrónico a '}
            <span className="info-highlight">info@yakera.org</span>
            {EN
            ?
            '. We are here to help you and answer any questions.'
            :
            '. Estamos aquí para ayudarte y responder cualquier pregunta.'}
        </p>
        }

        { isMobile
        ?
        <h2 className="subtitle-text-mobile"><span>{EN ? 'Details' : 'Detalles'}</span></h2>
        :
        <h2 className="subtitle-text"><span>{EN ? 'Details' : 'Detalles'}</span></h2>
        }
        <p className="category-label">{EN ? 'Campaign Category' : 'Categoría de campaña'}</p>

        { isMobile
        ?
        <div className="col">
            <div className="row">
                <label>
                    <input type="radio" name="campaigncategory" id="category0" value={EN ? 'healthcare' : 'salud'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="row radio-card">
                        <div className="mobile-img">
                            <img src={healthcare} alt="Healthcare" className="category-img-mobile" />
                        </div>
                        <p className="radio-title-mobile" id="text-category0">{EN ? 'Healthcare' : 'Salud'}</p>
                        <p className="radio-body-mobile radio-body-hidden" id="body-category0">
                            {EN
                             ?
                             'Raise funds to cover medical treatments, operations, tests, medications or any product/service that affects the quality of your health or that of someone else.'
                             :
                             'Recauda fondos para cubrir tratamientos médicos, operaciones, exámenes, medicamentos o cualquier producto/servicio que influya en la calidad de tu salud o la de alguien más.'}
                        </p>
                    </div>
                </label>
            </div>

            <div className="row">
                <label>
                    <input type="radio" name="campaigncategory" id="category1" value={EN ? 'education' : 'educación'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="row radio-card">
                        <div className="mobile-img">
                            <img src={education} alt="Education" className="category-img-mobile" />
                        </div>
                        <p className="radio-title-mobile" id="text-category1">{EN ? 'Education' : 'Educación'}</p>
                        <p className="radio-body-mobile radio-body-hidden" id="body-category1">
                            {EN
                             ?
                             'Raise funds to be able to pay for any product/service that directly or indirectly affects the quality of learning and education.'
                             :
                             'Recauda fondos para poder pagar cualquier producto/servicio que influya en la calidad de aprendizaje y la formación educativa de manera directa o indirecta.'}
                        </p>
                    </div>
                </label>
            </div>

            <div className="row">
                <label>
                    <input type="radio" name="campaigncategory" id="category2" value={EN ? 'small business' : 'pequeños negocios'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="row radio-card">
                        <div className="mobile-img">
                            <img src={smallbusiness} alt="Small Business" className="category-img-mobile" />
                        </div>
                        <p className="radio-title-mobile" id="text-category2">{EN ? 'Small Business' : 'Pequeños Negocios'}</p>
                        <p className="radio-body-mobile radio-body-hidden" id="body-category2">
                            {EN
                             ?
                             'Raise funds to pay for projects that will improve your economy and/or quality of life. For example: get a home or grow a business.'
                             :
                             'Recauda fondos para costear proyectos que mejorarán tu economía y/o calidad de vida. Por ejemplo: conseguir una vivienda o hacer crecer un emprendimiento.'}
                        </p>
                    </div>
                </label>
            </div>

            <div className="row">
                <label>
                    <input type="radio" name="campaigncategory" id="category3" value={EN ? 'nutrition' : 'alimentación'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="row radio-card">
                        <div className="mobile-img">
                            <img src={nutrition} alt="Nutrition" className="category-img-mobile" />
                        </div>
                        <p className="radio-title-mobile" id="text-category3">{EN ? 'Nutrition' : 'Nutrición'}</p>
                        <p className="radio-body-mobile radio-body-hidden" id="body-category3">
                            {EN
                             ?
                             'Raise funds to contribute to the daily food of your family, a soup kitchen or shelter. It can be for both people and animals.'
                             :
                             'Recauda fondos para contribuir en la alimentación diaria de tu familia, de un comedor social o refugio. Puede ser tanto para personas como para animales.'}
                        </p>
                    </div>
                </label>
            </div>
        </div>
        :
        <div className="row">
            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category0" value={EN ? 'healthcare' : 'salud'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <div className="center-img">
                                <img src={healthcare} alt="Healthcare" className="category-img" />
                            </div>
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category0">{EN ? 'Healthcare' : 'Salud'}</p>
                            <p className="radio-body radio-body-hidden" id="body-category0">
                                {EN
                                 ?
                                 'Raise funds to cover medical treatments, operations, tests, medications or any product/service that affects the quality of your health or that of someone else.'
                                 :
                                 'Recauda fondos para cubrir tratamientos médicos, operaciones, exámenes, medicamentos o cualquier producto/servicio que influya en la calidad de tu salud o la de alguien más.'}
                            </p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category1"  value={EN ? 'education' : 'educación'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <div className="center-img">
                                <img src={education} alt="Education" className="category-img" />
                            </div>
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category1">{EN ? 'Education' : 'Educación'}</p>
                            <p className="radio-body radio-body-hidden" id="body-category1">
                                {EN
                                 ?
                                 'Raise funds to be able to pay for any product/service that directly or indirectly affects the quality of learning and education.'
                                 :
                                 'Recauda fondos para poder pagar cualquier producto/servicio que influya en la calidad de aprendizaje y la formación educativa de manera directa o indirecta.'}
                            </p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category2"  value={EN ? 'small business' : 'pequeños negocios'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <div className="center-img">
                                <img src={smallbusiness} alt="Small Business" className="category-img" />
                            </div>
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category2">{EN ? 'Small Business' : 'Pequeños Negocios'}</p>
                            <p className="radio-body radio-body-hidden" id="body-category2">
                                {EN
                                 ?
                                 'Raise funds to pay for projects that will improve your economy and/or quality of life. For example: get a home or grow a business.'
                                 :
                                 'Recauda fondos para costear proyectos que mejorarán tu economía y/o calidad de vida. Por ejemplo: conseguir una vivienda o hacer crecer un emprendimiento.'}
                            </p>
                        </div>
                    </div>
                </label>
            </div>

            <div className="col">
                <label>
                    <input type="radio" name="campaigncategory" id="category3"  value={EN ? 'nutrition' : 'alimentación'} radioGroup="category" onChange={handleRadioChange} className="radio-card-input" />
                    <div className="panel panel-default radio-card">
                        <div className="panel-heading">
                            <div className="center-img">
                                <img src={nutrition} alt="Nutrition" className="category-img" />
                            </div>
                        </div>
                        <div className="panel-body">
                            <p className="radio-title" id="text-category3">{EN ? 'Nutrition' : 'Nutrición'}</p>
                            <p className="radio-body radio-body-hidden" id="body-category3">
                                {EN
                                 ?
                                 'Raise funds to contribute to the daily food of your family, a soup kitchen or shelter. It can be for both people and animals.'
                                 :
                                 'Recauda fondos para contribuir en la alimentación diaria de tu familia, de un comedor social o refugio. Puede ser tanto para personas como para animales.'}
                            </p>
                        </div>
                    </div>
                </label>
            </div>
        </div>
        }
    </div>
    )
}

export default CampaignIntroPage;
