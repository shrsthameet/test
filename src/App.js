import React from "react";
import "./App.less";
import SearchComponent from "./apiIntegration/SearchComponent";
import InputComponent from "./googleMap/InputComponent";

function App() {
  return (
    <>
      <SearchComponent />
      <InputComponent />
    </>
  );
}

export default App;
