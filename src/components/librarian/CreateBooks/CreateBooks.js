import React, { useContext } from "react";
import { AuthContext } from "../../../auth/AuthContext";
import httpClient from "../../../services/services";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { loadProgressBar } from "axios-progress-bar";

const CreateBooks = () => {
  const { user } = useContext(AuthContext);
  let navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      publishedYear: "",
      genere: "",
      stock: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("author", values.author);
      formData.append("publishedYear", values.publishedYear);
      formData.append("genre", values.genre);
      formData.append("stock", values.stock);

      httpClient
        .postUpload("librarian/add", formData, {
          Authorization: `JWT ${user.token}`,
        })
        .then((res) => {
          const { message } = res.data;
          toast.success(message, {
            position: "top-center",
            autoClose: 1400,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/librarian/");
          }, 2000);
          loadProgressBar();
        })
        .catch((err) => {
          const { message } = err.response.data;
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    },
  });

  return (
    <div className="px-8 py-5 w-full">
      <div className="flex flex-col items-center">
        <h3 className="text-5xl text-gray-800 font-extrabold">Create a book</h3>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col w-full justify-center items-center mt-4 mb-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
                    w-1/2
                    text-base text-black
                    placeholder-gray-500
                    border border-gray-200
                    rounded-md
                    py-2
                    px-2
                    my-4"
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            onChange={formik.handleChange}
            value={formik.values.author}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
                    w-1/2
                    text-base text-black
                    placeholder-gray-500
                    border border-gray-200
                    rounded-md
                    py-2
                    px-2
                    my-4"
          />
          <input
            type="text"
            name="publishedYear"
            placeholder="Published Year"
            onChange={formik.handleChange}
            value={formik.values.publishedYear}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
                    w-1/2
                    text-base text-black
                    placeholder-gray-500
                    border border-gray-200
                    rounded-md
                    py-2
                    px-2
                    my-4"
          />
          <input
            type="text"
            name="genere"
            placeholder="Genere"
            onChange={formik.handleChange}
            value={formik.values.genere}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
                    w-1/2
                    text-base text-black
                    placeholder-gray-500
                    border border-gray-200
                    rounded-md
                    py-2
                    px-2
                    my-4"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={formik.handleChange}
            value={formik.values.stock}
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
                    w-1/2
                    text-base text-black
                    placeholder-gray-500
                    border border-gray-200
                    rounded-md
                    py-2
                    px-2
                    my-4"
          />
          <button
            type="submit"
            className="focus:bg-primary-400 py-2 px-12 rounded bg-primary text-white mt-4 w-1/2"
          >
            Create
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreateBooks;
