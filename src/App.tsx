import React from "react";

import "./App.css";
import MainPaige from "./components/pages/MainPaige/MainPaige";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "./redux/index";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <MainPaige />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
