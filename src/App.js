import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/Home/Home";
import Watch from "./pages/Watch/Watch";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useDispatch } from "react-redux";
import { setUser } from "./slices/userSlice";
import axios from "./axios";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("userToken"));
    if (getToken) {
      const getUser = async () => {
        try {
          const res = await axios.get(`/auth/verify/${getToken}`);
          dispatch(setUser(res.data));
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
    }
  }, []);

  const user = useSelector((state) => state.userInfo.user);

  return (
    <div className="app">
      <Router>
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/register" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          {user && (
            <>
              <Route path="/movie" element={<Home type="movie" />} />
              <Route path="/series" element={<Home type="series" />} />
              <Route path="/watch" element={<Watch />} />
            </>
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
