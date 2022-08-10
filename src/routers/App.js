import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/login/login";

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
