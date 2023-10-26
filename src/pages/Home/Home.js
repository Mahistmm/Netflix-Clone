import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Featured from "../../components/Featured/Featured";
import List from "../../components/List/List";
import axios from "../../axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);

  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userToken"));
    console.log(token);
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `/list${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(res.data);
        setLists(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Featured type={type} />

      {lists.map((list, index) => {
        return <List list={list} key={index} />;
      })}
      <Navbar />
    </div>
  );
};

export default Home;
