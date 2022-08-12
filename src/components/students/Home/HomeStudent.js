import React, { useEffect, useState, useContext } from "react";
import httpClient from "../../../services/services";
import { AuthContext } from "../../../auth/AuthContext";
import BookCard from "../../UI/BookCard";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { loadProgressBar } from "axios-progress-bar";

const HomeStudent = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [body, setBody] = useState({});
  const [numPages, setNumPages] = useState(1);
  const { user } = useContext(AuthContext);

  const Formik = useFormik({
    initialValues: {
      title: "",
      publishedYear: "",
      genere: "",
      author: "",
    },
    onSubmit: (values) => {
      setBody(values);
      setPage(1);
      setBooks([]);
    },
  });

  const loadMore = () => {
    if (page < numPages) {
      setPage((page) => page + 1);
    }
  };

  useEffect(() => {
    const loadBooks = () => {
      loadProgressBar();
      httpClient
        .post(`student/books/search/${page}`, body, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          if (res.data.books.length > 0) {
            setBooks((books) => books.concat(res.data.books));
            setNumPages(res.data.numPages);
          } else {
            setBooks([]);
          }
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
    loadBooks();
  }, [page, body, user]);

  return (
    <div className="px-8 py-5 w-full">
      <div className="flex flex-col items-center">
        <form
          onSubmit={Formik.handleSubmit}
          className="flex flex-col md:flex-row md:flex-wrap lg:flex-row xl:flex-row md:justify-between mb-4"
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="bg-gray-200 appearance-none border-2 my-2 border-gray-200 rounded-xl w-full md:w-48 lg:w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={Formik.handleChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            className="bg-gray-200 appearance-none border-2 my-2 border-gray-200 rounded-xl w-full md:w-48 lg:w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={Formik.handleChange}
          />
          <input
            type="text"
            name="publishedYear"
            placeholder="Published Year"
            className="bg-gray-200 appearance-none border-2 my-2 border-gray-200 rounded-xl w-full md:w-48 lg:w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={Formik.handleChange}
          />
          <input
            type="text"
            name="genere"
            placeholder="Genere"
            className="bg-gray-200 appearance-none border-2 my-2 border-gray-200 rounded-xl w-full md:w-48 lg:w-1/6 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
            onChange={Formik.handleChange}
          />
          <button
            type="submit"
            className="bg-blue-500 my-2 hover:bg-blue-700 text-white font-bold py-2 md:w-full lg:w-1/6 px-4 rounded-xl"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-row w-full flex-wrap justify-around mt-4 mb-4">
        {books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              idBook={book._id}
              title={book.title}
              author={book.author}
              url={`student/details`}
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

export default HomeStudent;