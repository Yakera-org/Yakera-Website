import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

import "./App.css";

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <div>
        <NavBar />
        <Main />
      </div>
    </React.Fragment>
  );
}
export default App;
