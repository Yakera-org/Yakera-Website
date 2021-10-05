import React, { useState, useEffect, useCallback } from 'react';
import EmailVerificationTemplate from './EmailVerificationTemplate';
import LanguageService from "../../../services/language";
import api from "../../../services/api";


function EmailVerificationPage() {

    const handleEmailVerification = useCallback(async() => {
        const token = new URLSearchParams(window.location.search).get('token');
        if (!token) {
            window.location.href = "/404";
        };

        let EN;
        if (LanguageService.getLanguage() === "en") {
            EN = true
        } else {
            EN = false
        }

        try {
            await api.get(`/auth/verify-email?token=${token}`);
            setSuccess(
                EN 
                ? 'Your account has been verified successfully!'
                : '¡Tu cuenta ha sido verificado con éxito!'
            );
            window.location.href = "/login";
        } catch (err) {
            setError(
                EN 
                ? 'We could not verify your account. Please try again or contact our support team at info@yakera.org' 
                : 'No pudimos verificar tu cuenta. Vuelve a intentarlo luego o contacta nuestro equipo de soporte en info@yakera.org'
            );
            window.location.href = "/login";
        }
    }, []);

    useEffect(() =>{
        handleEmailVerification();
    }, [handleEmailVerification]);

    const [successMessage, setSuccess] = useState('');  
    const [errorMessage, setError] = useState('');

    return (
        <div>
          <EmailVerificationTemplate
            success={successMessage}
            error={errorMessage}
          />
        </div>
    );

}

export default EmailVerificationPage;