import React from "react";
import ReactDOM from "react-dom";
import Pet from "./Pet";

const App = () => {
  return (
    <div>
      <h1>Adopt Me Pet!</h1>
      <Pet name="Brandy" animal="Dog" breed="Havanese" />
      <Pet name="Cocoo" animal="Bird" breed="Parrot" />
      <Pet name="Whisker" animal="Cat" breed="Mix" />
    </div>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
