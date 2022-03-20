import React from 'react';
import { Grid } from '@material-ui/core';
import { Alert } from 'reactstrap';
import HashLoader from "react-spinners/HashLoader";

const EditPageVisual = ({
    profileData,
    EN,
}) => {


  return (
    <div className='dashboard-container-edit'>
        <Grid container spacing={1} style={{ textAlign: 'center' }}>
            <Grid item xs={12} sm={12}>
                <div className='banner'>
                    <h2>
                        {EN ? 'Edit Profile Details' : 'Editar detalles del perfil'}
                    </h2>
                </div>
            </Grid>
        </Grid>
    </div>
  )
};

export default EditPageVisual;