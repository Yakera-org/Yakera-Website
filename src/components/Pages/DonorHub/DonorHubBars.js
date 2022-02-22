import React from 'react';

function DonorHubBars(props) {

  return (
    <div className='donor-progress'>
      <div className='donation-progress' ></div>
      <div className='progress-bar' style={{ backgroundColor: props.type, width: props.size }}></div>
    </div >
  )
}

export default DonorHubBars;