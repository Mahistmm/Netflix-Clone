import React, { useState } from "react";
import "./Navbar.css";
import { ArrowDropDown, Notifications, Search } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const logoutUser = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <nav>
      <div className={isScrolled ? "navbar__scrolled" : "navbar"}>
        <div className="navbar__container">
          <div className="navbar__right">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
              alt="logo"
            />
            <Link to="/">
              <span className="navbar__home">Home</span>
            </Link>
            <Link to="/series">
              <span>Series</span>
            </Link>
            <Link to="/movie">
              <span>Movies</span>
            </Link>
            <span className="navbar__home">New and Popular</span>
            <span className="navbar__home">My List</span>
          </div>
          <div className="navbar__left">
            <Search className="icon" />
            <span>KID</span>
            <Notifications className="icon" />
            <img
              src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt="avatar"
            />
            <div className="profile">
              <ArrowDropDown className="icon" />
              <div className="options">
                <span>Settings</span>
                <span onClick={logoutUser}>Logout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
