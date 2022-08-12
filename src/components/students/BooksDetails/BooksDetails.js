import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { useParams } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer, toast } from "react-toastify";

const BooksDetails = () => {
  const { user } = useContext(AuthContext);
  const [details, setDetails] = useState([]);
  const { idBook } = useParams();

  const requestBooking = () => {
    const body = {
      idBook,
      idStudent: user.userId,
    };
    httpClient
      .post(`student/books/requestbook`, body, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        const { message } = res.data;
        toast.success(message, {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        loadProgressBar();
      })
      .catch((err) => {
        const { message } = err.response.data;
        toast.error(message, {
          position: "top-right",
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
        loadProgressBar();
      });
  };

  useEffect(() => {
    const getBookDetails = () => {
      httpClient
        .get(`student/books/details/${idBook}`, {
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
          <div className="flex flex-col h-full justify-evenly">
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

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300 disabled:hover:bg-blue-400 disabled:cursor-not-allowed"
              disabled={details.stock === 0}
              onClick={() => requestBooking(details.id)}
            >
              Request Book
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default BooksDetails;