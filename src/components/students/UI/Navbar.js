import React, { useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useContext(AuthContext);
  let navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: types.logout,
    });
    navigate("/");
  };

  return (
    <div>
      <nav className="bg-regal-blue shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-12 w-12" src={logo} alt="Workflow" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavLink
                    className="hover:bg-primary duration-300 text-white px-3 py-2 rounded-md text-sm font-medium nav"
                    to="/student"
                    end
                  >
                    Home
                  </NavLink>

                  <NavLink
                    className="hover:bg-primary duration-300 text-white px-3 py-2 rounded-md text-sm font-medium nav"
                    to="request"
                    end
                  >
                    My requests
                  </NavLink>
                  <button
                    className="bg-red-500 text-white
                    px-3 py-2 rounded-md text-sm font-medium right-2 absolute mr"
                    onClick={() => handleLogout()}
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-primary hover:text-primary hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink
                  className="hover:bg-primary duration-300 text-white px-3 py-2 rounded-md text-sm font-medium nav"
                  to="/student"
                  end
                >
                  Home
                </NavLink>
                <NavLink
                  className="hover:bg-primary duration-300 text-white px-3 py-2 rounded-md text-sm font-medium nav"
                  to="request"
                  end
                >
                  My requests
                </NavLink>

                <button
                  className="bg-red-500
                  text-white px-3 py-2 rounded-md text-sm font-medium mb-4"
                  onClick={() => handleLogout()}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;
