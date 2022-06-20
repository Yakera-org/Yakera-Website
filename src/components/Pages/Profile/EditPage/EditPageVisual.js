import React from 'react';
import HashLoader from "react-spinners/HashLoader";
import EditContent from './EditContent';

function EditPageVisual(props) {
    const EN = props.EN
    const user = props.data.user
    const type = props.type
    const loading = props.loading
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

            {loading
            ?
            <div className="loader-wrapper">
                <HashLoader
                    size={60}
                    color={"#ea8737"}
                    loading={true}
                    />
            </div>
            :
            <>
                <EditContent EN={EN} user={user} type={type}/>

                <section className='save-area'>
                    <hr />
                    <button className={props.activeChange ? "active" : "disabled"}>
                        {EN ? 'Save changes' : 'Guardar cambios'}
                    </button>
                    <p>
                        {EN ? 'Want to delete your account? Click ' : '¿Te gustaría eliminar tu cuenta? Haz click '}
                        <a href = {`mailto:info@yakera.org?subject=Delete Yakera Donor Account&body=Hello Yakera, I would like to delete my Donor Account with email: ${user.email}`}>
                            {EN ? 'here' : 'aquí'}
                        </a>
                        {EN ? ' to get in touch with one of the members of the team.' : ' para ponerte en contacto con un miembro de nuestro equipo.'}
                    </p>
                </section>
            </>
            }
        </div>
    );
}

export default EditPageVisual;