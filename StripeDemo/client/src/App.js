import './App.css';
import StripeContainer from './components/StripeContainer';
import React, { useState } from 'react';

function App() {
  const [showItem, setShowItem] = useState(false);

  return (
    <div className="App">
      <h1>Generic Donation Platform</h1>
      {showItem ? <StripeContainer /> : <><h3>$10.00</h3>
      <button onClick={() => setShowItem(true)}>Donate</button></>}
    </div>
  );
}

export default App;
