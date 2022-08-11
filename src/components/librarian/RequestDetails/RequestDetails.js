import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { useParams } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";
import Moment from "react-moment";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RequestDetails = () => {
  const { user } = useContext(AuthContext);
  const { idRequest } = useParams();
  const [details, setDetails] = useState([]);
  const [userDetails, setUserDetails] = useState([]);
  const [bookDetails, setBooksDetails] = useState([]);
  let navigate = useNavigate();

  const returnBook = () => {
    
    let body = {
      idRequest: idRequest,
    };
    httpClient
      .post(`librarian/returnBook/`, body, {
        Authorization: `JWT ${user.token}`,
      })
      .then((res) => {
        const { message } = res.data;
        toast.success(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        loadProgressBar();
        setTimeout(() => {
          navigate("/librarian");
        }, 2000);
      })
      .catch((err) => {
        const { message } = err.response.data;
        toast.error(message, {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  useEffect(() => {
    const getRequestedDetails = () => {
      httpClient
        .get(`librarian/requestBookDetail/${idRequest}`, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          setDetails(res.data.result);
          setBooksDetails(res.data.result.idBook);
          setUserDetails(res.data.result.idStudent);
          loadProgressBar();
        });
    };
    getRequestedDetails();
  }, [idRequest, user]);

  return (
    <div className="px-8 py-5 w-screen h-screen">
      <div className="lg:w-9/10 w-full p-8 flex flex-col lg:flex-row lg:h-96 h-auto mx-auto justify-evenly">
        <div className="lg:w-5/12 h-full w-full">
          <div className="flex flex-col h-full justify-between">
            <h3 className="text-2xl font-bold">{bookDetails.title}</h3>
            <p className="text-gray-600 text-base">
              Author: {bookDetails.author}, Genre: {bookDetails.genre}, Year:
              {bookDetails.publishedYear}
            </p>
            <p className="text-gray-600 text-base">
              Request date:
              <Moment format="YYYY-MM-DD HH:mm">{details.dateRequest}</Moment>
            </p>
            {details.dateReturn && (
              <p className="text-gray-600 text-base">
                Return date:
                <Moment format="YYYY-MM-DD HH:mm">{details.dateReturn}</Moment>
              </p>
            )}
            <p className="text-gray-600 text-base">
              Status:
              <span className="text-gray-500">
                {details.status ? "Finish" : "Approved"}
              </span>
            </p>
            <p className="text-gray-600 text-base">
              Student:
              <span className="text-gray-500">{userDetails.name}</span>
            </p>

            {!details.status && (
              <button
                onClick={returnBook}
                className="border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 border-2 text-lg font-bold py-2 px-4 rounded w-full h-12 mt-4"
              >
                Return book
              </button>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RequestDetails;