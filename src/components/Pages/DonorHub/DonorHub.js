import React from 'react';
import Author from '../../author';
import DonorHubVisual from './DonorHubVisual';

import './DonorHub.css';

function DonorHub() {
  
  return (
    <div className='donorhub-page'>
      <DonorHubVisual />
      <Author />
    </div>
  )

}

export default DonorHub;