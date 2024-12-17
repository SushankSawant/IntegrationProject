import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import "./Context/Feed.css";

function NewsFull() {
  let location = useLocation();
  let data = location.state;
  console.log(data);
  return (
    <div className="new_wrapper">
      <Navbar />
      <div className="news_holder">
        <img src={data.res.multimedia[0].url} alt="" />
        <div className="details">
          <h1>{data.res.title}</h1>
          <span>{data.res.published_date}</span>
          <p>{data.res.abstract}</p>
          <a href={data.res.url} target="_blank">
            Visit Website
          </a>
        </div>
      </div>
    </div>
  );
}

export default NewsFull;
