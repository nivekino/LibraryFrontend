import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthContext";
import { types } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loadProgressBar } from "axios-progress-bar";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";
import "axios-progress-bar/dist/nprogress.css";
import "./assets/login.css";
import bgLarge from "./assets/img/bg-large.png";

const login = () => {
  return (
    <div className="h-screen w-screen flex items-center flex-col lg:flex-row lg:justify-between lg:bg-yellowr">
      <div className="w-full h-auto lg:w-6/12">
        <img
          src={bgLarge}
          alt="hoja"
          className="lg:w-auto lg:h-screen lg:object-cover w-full h-96 hidden lg:block md:block"
        />
        <img
          src={bgLarge}
          alt="hoja"
          className="lg:w-auto lg:h-screen object-cover w-full h-96 block lg:hidden md:hidden"
        />
      </div>
      <div className="w-full h-auto lg:w-4/12 px-8">
        <form className="h-full flex flex-col justify-evenly items-center">
          <h2 className="text-green-500 text-6xl font-bold">
            Log <span className="text-gray-800">in!</span>
          </h2>

          <input
            type="text"
            name="Email"
            placeholder="Email"
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            mt-10
            input-login"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="focus:border-green focus:ring-1 focus:ring-green focus:outline-none
            w-full
            text-base text-black
            placeholder-gray-500
            border border-gray-200
            rounded-md
            py-2
            px-2
            my-4
            input-login"
          />
          <button
            type="submit"
            className="focus:bg-primary-400 py-2 px-12 rounded bg-green-500 text-white mt-4"
          >
            Login
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default login;
