import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import NavBar from './components/NavBar';
import Main from './components/Main';
import { ParallaxProvider } from 'react-scroll-parallax';

//import Construction from './components/Pages/Construction/construction';

import './App.css';




function App() {
 
  return (
    
      <React.Fragment>
        <CssBaseline />
          <div>
            <NavBar />
            <ParallaxProvider>
              <Main />
            </ParallaxProvider>
            {/* <Footer /> */}
          </div>
      </React.Fragment>
  );
}
export default App;



