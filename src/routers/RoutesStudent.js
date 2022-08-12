import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/students/UI/Navbar";
import HomeStudent from "../components/students/Home/HomeStudent";
import BooksDetails from "../components/students/BooksDetails/BooksDetails";
import RequestStudent from "../components/students/RequestStudent/RequestStudent";

const RoutesStudent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeStudent />} />
        <Route path="*" element={<HomeStudent />} />
        <Route path="/details/:idBook" element={<BooksDetails />} />
        <Route path="request" element={<RequestStudent />} />
      </Routes>
    </>
  );
};

export default RoutesStudent;