import React from 'react';

function PaymentLocationCheck(props) {
    const EN = props.EN;
    const onBack = props.onBack;
    const onContinue = props.onContinue;
    const restricted = props.restricted;
    const setRestricted = props.setRestricted;

    return (
        <div className="location-check">
            <div className="location-check-question">
                {EN
                ?
                'Are you donating from the US or using a US issued card?'
                :
                '¿Está donando desde los EE. UU. o utilizando una tarjeta emitida en los EE. UU.?'
                }
            </div>
            <div className="col location-options-group">
                <div className="row location-option-row">
                    <input
                        type="radio"
                        name="location"
                        id="restricted"
                        checked={restricted === true}
                        onChange={setRestricted}
                        className="location-option"
                    />
                    <label for="restricted" className="location-label">
                        {EN
                        ?
                        "Yes, I'm using a US-based payment option."
                        :
                        'Sí, estoy usando un método de pago de los EE. UU.'
                        }
                    </label>
                </div>
                <div className="row location-option-row">
                    <input
                        type="radio"
                        name="location"
                        id="free"
                        checked={restricted === false}
                        onChange={setRestricted}
                        className="location-option"
                    />
                    <label for="free"  className="location-label">
                        {EN
                        ?
                        "No, I'm not using a US-based payment option."
                        :
                        'No, no estoy usando un método de pago de los EE. UU.'
                        }
                    </label>
                </div>
            </div>
            <div className="row justify-content-center location-btns">
                <button type="button" onClick={onBack} className="location-back">
                    {EN ? 'Back' : 'Regresar'}
                </button>
                <button type="button" onClick={onContinue} className="location-continue">
                    {EN ? 'Continue' : 'Continuar'}
                </button>
            </div>
        </div>
    );
}

export default PaymentLocationCheck;
