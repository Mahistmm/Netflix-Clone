import React from "react";
import "./Watch.css";
import { ArrowBackOutlined, Login, Movie } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

const Watch = () => {
  const location = useLocation();
  const { state } = location;
  console.log(state);
  return (
    <div className="watch">
      <Link to="/">
        <div className="back">
          <ArrowBackOutlined />
          Home
        </div>
      </Link>
      <video
        className="video"
        autoPlay={true}
        progress
        controls
        src={state.movie.video}
      />
    </div>
  );
};

export default Watch;
