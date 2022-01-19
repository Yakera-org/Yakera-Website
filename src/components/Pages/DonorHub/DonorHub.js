import React from 'react';
import Author from '../../author';
import Navbar from '../../NavBar';
import DonorHubVisual from './DonorHubVisual';

import './DonorHub.css';

function DonorHub() {

  return (
    <div className='donorhub-container'>
      <Navbar />
      <DonorHubVisual />
      <Author />
    </div>
  )

}

export default DonorHub;