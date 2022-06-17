import React from 'react';
import HashLoader from "react-spinners/HashLoader";

function EditPageVisual(props) {
    const EN = props.EN
    const user = props.data.user
    const type = props.type
    return (
        <div className='edit-container'>
            <section className='banner'>
                {EN ? ' Edit Profile Details' : ' Editar detalles del perfil'} 
            </section>
            <div className='sub-banner'>
                <a href='/profile'>
                    <i className="fas fa-arrow-left"></i>
                    {EN ? ' Return' : ' Volver'}
                </a>
            </div>

            {props.loading
            ?
            <div className="loader-wrapper">
                <HashLoader
                    size={60}
                    color={"#ea8737"}
                    loading={true}
                    />
            </div>
            :
                user.firstName
            }
        </div>
    );
}

export default EditPageVisual;