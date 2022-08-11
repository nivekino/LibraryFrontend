import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import RoutesLibrarian from "../routers/RoutesLibrarian";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/login";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/librarian/*"
          element={
            <PrivateRoute user={user} roleNeed={1}>
              <RoutesLibrarian />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
