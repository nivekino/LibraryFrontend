import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import BookCard from "../../UI/BookCard";
import { loadProgressBar } from "axios-progress-bar";
import { ToastContainer, toast } from "react-toastify";

const HomeLibrarian = () => {
  const { user } = useContext(AuthContext);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState(1);

  useEffect(() => {
    const getAllBooks = () => {
      httpClient
        .get(`librarian/getBooks/${page}`, {
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
    getAllBooks();
  }, [page, user]);

  const loadMore = () => {
    if (page < numPages) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className="px-8 py-5 w-full">
      <div className="flex flex-col items-center">
        <h3 className="text-5xl text-gray-800 font-extrabold">Book list</h3>
      </div>
      <div className="flex flex-row pt-4 justify-evenly items-start w-full flex-wrap">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              idBook={book._id}
              title={book.title}
              author={book.author}
              url={"librarian/booksdetail"}
            />
          ))
        ) : (
          <div className="flex flex-col items-center">
            <h3 className="text-3xl text-gray-800">No books found</h3>
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
      <ToastContainer />
    </div>
  );
};

export default HomeLibrarian;
