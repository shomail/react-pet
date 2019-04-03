import React, { useState, lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import ThemeContext from "./ThemeContext";
import NavBar from "./NavBar";

const Details = lazy(() => import("./Details"));
const SearchParams = lazy(() => import("./SearchParams"));

const FourOhFour = () => <h1>404 Not found</h1>;

const App = () => {
  const theme = useState("darkblue");
  return (
    <React.StrictMode>
      <ThemeContext.Provider value={theme}>
        <div>
          <NavBar />
          <Suspense fallback={<h1>Loading...</h1>}>
            <Router>
              <SearchParams path="/" />
              <Details path="/details/:id" />
              <FourOhFour default />
            </Router>
          </Suspense>
        </div>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
