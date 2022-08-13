import React from 'react';

function PaymentLocationCheck(props) {
    const EN = props.EN;
    const onBack = props.onBack;
    const onContinue = props.onContinue;
    const restricted = props.restricted;
    const setRestricted = props.setRestricted;

    return (
        <div className="loaction-check">
            <div className="location-check-question">
                {EN
                ?
                'Are you donating from the US or using a US issued card?'
                :
                '¿Está donando desde los EE. UU. o utilizando una tarjeta emitida en los EE. UU.?'
                }
            </div>
            <label className="checkbox-button">
                <input
                    name="location"
                    type="checkbox"
                    checked={restricted}
                    onChange={setRestricted}
                    style={{
                        marginTop: "-5px",
                        width: "15px",
                        float: "left",
                        clear: "both",
                    }}
                    className="checkbox-square"
                />
                <span className="checkbox-button-control" style={{marginLeft: EN ? "-275px" : "-320px"}}></span>
                <div className="description" id="checkbox-text">
                    {EN
                    ?
                    "Yes, I'm using a US-based payment option."
                    :
                    "Sí, estoy usando un método de pago de los EE. UU."
                    }
                </div>
            </label>
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
