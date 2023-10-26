import React, { useRef, useState } from "react";
import "./Register.css";
import axios from "../../axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const navigate = useNavigate();

  const emailRef = useRef();

  const handleFinish = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/auth/register", {
        username: username,
        password: password,
        email: email,
      });
      if (res) {
        alert("Your account is successfully created");
        setPassword("");
        setUsername("");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };

  return (
    <div className="register">
      <div className="top">
        <div className="register__wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          <div onClick={() => navigate("/login")}>
            <button className="loginButton">Sign In</button>
          </div>
        </div>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Next
            </button>
          </div>
        ) : (
          <form className="input">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="registerButton" onClick={handleFinish}>
              Get Started
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
