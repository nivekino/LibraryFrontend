import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { useParams } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";

const BookDetail = () => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const { idBook } = useParams();

  useEffect(() => {
    const getBookDetails = () => {
      httpClient
        .get(`librarian/books/details/${idBook}`, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          setDetails(res.data);
          loadProgressBar();
        });
    };

    getBookDetails();
  }, [user, idBook]);

  return (
    <div className="px-8 py-5 w-screen h-screen">
      <div className="lg:w-9/10 w-full p-8 flex flex-col lg:flex-row lg:h-96 h-auto mx-auto justify-evenly">
        <div className="lg:w-5/12 h-full w-full">
          <div className="flex flex-col h-full">
            <h3 className="text-2xl font-bold mb-3">{details.title}</h3>
            <p className="text-gray-600 text-lg mb-3">
              Author: {details.author}
            </p>
            <p className="text-gray-600 text-lg mb-3">Genere: {details.genere}</p>
            <p className="text-gray-600 text-lg mb-3">
              Year: {details.publishedYear}
            </p>
            <p className="text-gray-600 text-lg">
              Stock: {details.stock === 0 ? "Out stock" : details.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;