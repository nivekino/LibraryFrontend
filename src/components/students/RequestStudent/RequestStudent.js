import React, { useContext, useEffect, useState } from "react";
import httpClient from "../../../services/services";
import { AuthContext } from "../../../auth/AuthContext";
import { loadProgressBar } from "axios-progress-bar";
import { toast } from "react-toastify";
import BookCard from "../../UI/BookCard";

const RequestStudent = () => {
  const { user } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [books, setBooks] = useState([]);
  const [numPages, setNumPages] = useState(1);

  const loadMore = () => {
    if (page < numPages) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const requestBookingHistory = () => {
      const body = {
        idStudent: user.userId,
      };
      httpClient
        .post(`student/books/myrequests/${page}`, body, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          setBooks((books) => books.concat(res.data.books));
          setNumPages(res.data.numPages);
          loadProgressBar();
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
    requestBookingHistory();
  }, [page, user]);

  return (
    <div className="px-8 py-5 w-full">
      <div className="flex flex-row w-full flex-wrap justify-around mt-4 mb-4">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              idBook={book.idBook._id}
              title={book.idBook.title}
              author={book.idBook.author}
              status={book.status}
              student={book.idStudent.name}
              url={"student"}
            />
          ))
        ) : (
          <div className="flex flex-col w-full justify-center items-center mt-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-800">
              You don't have any request
            </h1>
          </div>
        )}
      </div>
      {page < numPages && (
        <button
          className="border-blue-500 hover:bg-blue-500 hover:text-white text-blue-500 border-2 text-lg font-bold py-2 px-4 rounded w-full h-12 mt-4"
          onClick={loadMore}
        >
          Load more
        </button>
      )}
    </div>
  );
};

export default RequestStudent;