import './App.css';
import StripeContainer from './components/StripeContainer';
import React from 'react';
import { Accordion, Card } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <h1>Generic Donation Platform</h1>
      <h3>$15.00 donation + $5.00 tip</h3>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Stripe
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <StripeContainer />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
  );
}

export default App;
