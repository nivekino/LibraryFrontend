import React from "react";
import { Routes, Route } from "react-router-dom";
import HomeLibrarian from "../components/librarian/Home/Homelibrarian";
import Navbar from "../components/librarian/UI/Navbar";
import CreateBooks from "../components/librarian/CreateBooks/CreateBooks";
import BookDetail from "../components/librarian/BookDetail/BookDetail";
import CreateStudent from "../components/librarian/CreateStudent/CreateStudent";

const RoutesLibrarian = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeLibrarian />} />
        <Route path="/createBooks" element={<CreateBooks />} />
        <Route path="/CreateStudent" element={<CreateStudent />} />
        <Route path="/booksdetail/:idBook" element={<BookDetail />} />
        <Route path="*" element={<HomeLibrarian />} />
      </Routes>
    </>
  );
};

export default RoutesLibrarian;
