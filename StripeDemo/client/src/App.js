import './App.css';
import StripeContainer from './components/StripeContainer';
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>Generic Donation Platform</h1>
      <h3>$15.00 donation + $5.00 tip</h3>
      <StripeContainer />
    </div>
  );
}

export default App;
