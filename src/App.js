import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import SearchParams from "./SearchParams";
import Details from "./Details";

const FourOhFour = () => <h1>404 Not found</h1>;

const App = () => {
  return (
    <React.StrictMode>
      <div>
        <h1>Adopt Me Pet!</h1>
        <Router>
          <SearchParams path="/" />
          <Details path="/details/:id" />
          <FourOhFour default />
        </Router>
      </div>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
