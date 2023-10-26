import React, { useEffect, useState } from "react";
import "./Login.css";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { setUser } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("userToken", JSON.stringify(res.data.token));
      const token = res.data.token;
      const getUser = async () => {
        try {
          const res = await axios.get(`/auth/verify/${token}`);
          dispatch(setUser(res.data));
        } catch (error) {
          alert(error.response.data.msg);
        }
      };
      getUser();
      navigate("/");
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

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

  return (
    <div className="login">
      <div className="top">
        <div className="login__wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
        <form>
          <h1>Sign In</h1>
          <input
            type="email"
            placeholder="Email or Phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="loginButton" onClick={handleLogin}>
            Sign In
          </button>
          <span>
            New to Netflix? <b>Sign up now.</b>
          </span>
          <small>
            This page is protected by Googe reCAPTCHA to ensure you're not a
            bot. <b>Leran more</b>.
          </small>
        </form>
      </div>
    </div>
  );
};

export default Login;
