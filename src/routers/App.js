import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import RoutesLibrarian from "../routers/RoutesLibrarian";
import PrivateRoute from "./PrivateRoute";
import Login from "../components/login/login";
import RoutesStudent from "../routers/RoutesStudent";

const App = () => {
  const { user } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/student/*"
          element={
            <PrivateRoute user={user} roleNeed={2}>
              <RoutesStudent />
            </PrivateRoute>
          }
        />

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
