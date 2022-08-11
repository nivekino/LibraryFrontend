import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { loadProgressBar } from "axios-progress-bar";
import BookCard from "../../UI/BookCard";

const RequestsBooks = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const { user } = useContext(AuthContext);
  const [numPages, setNumPages] = useState(1);

  const loadMore = () => {
    if (page < numPages) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const loadBooks = async () => {
      httpClient
        .post(
          `librarian/getRequestedBooks/${page}`,
          {},
          {
            Authorization: `JWT ${user.token}`,
          }
        )
        .then((res) => {
          setBooks((books) => books.concat(res.data.books));
          setNumPages(res.data.numPages);
          loadProgressBar();
        });
    };
    loadBooks();
  }, [page, user]);

  return (
    <div className="px-8 py-5 w-full">
      <div className="flex flex-row w-full flex-wrap justify-around mt-4 mb-4">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              idBook={book._id}
              title={book.idBook.title}
              author={book.idBook.author}
              url={"librarian/requestdetail"}
              status={book.status}
              student={book.idStudent.name}
            />
          ))
        ) : (
          <div className="w-full flex flex-col items-center justify-center">
            <h3 className="text-3xl text-gray-800">No book requests</h3>
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

export default RequestsBooks;