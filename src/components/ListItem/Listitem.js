import React, { useEffect, useState } from "react";
import "./Listitem.css";
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbUpAltOutlined,
} from "@mui/icons-material";
import axios from "../../axios";
import { Link } from "react-router-dom";

const Listitem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get("/movie/find/" + item, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userToken")),
          },
        });
        console.log(res);
        setMovie(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, [item]);

  return (
    <Link to="/watch" state={{ movie: movie }}>
      <div
        className="listitem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie.img} alt="movie" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="iteminfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfotop">
                <span>1 hour 14 mins</span>
                <span className="limit">{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}.</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};

export default Listitem;
