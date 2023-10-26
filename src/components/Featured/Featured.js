import React, { useEffect, useState } from "react";
import "./Featured.css";
import { InfoOutlined, PlayArrow } from "@mui/icons-material";
import axios from "../../axios";

const Featured = ({ type }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movie/random?type=${type}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("userToken")),
          },
        });
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };

    getRandomContent();
  }, [type]);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movie" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="thriller">Thriller</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
            <option value="western">Western</option>
            <option value="sci-fic">Sci-fic</option>
          </select>
        </div>
      )}

      <img src={content.img} alt="backround" className="backround" />
      <img src={content.img} alt="avatar" className="avatar" />
      <div className="featured__info">
        <img src={content.img} alt="" />
        <br />
        <span className="featured__desc">{content.desc}</span>
        <div className="featured__buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Featured;
