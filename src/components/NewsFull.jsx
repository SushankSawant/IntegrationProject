import React from "react";
import Navbar from "./Navbar";
import "../styling/feed.css";
import { useLocation } from "react-router-dom";

function NewsFull() {
  let location = useLocation();
  let data = location.state;
  console.log(data);
  return (
    <div className="fullnewsWrapper">
      {/* <Navbar /> */}
      <div className="fullnews">
        <img src={data.res.multimedia[0].url} alt="" />
        <div className="details">
          <h1>{data.res.title}</h1>
          <span>{data.res.published_date}</span>
          <p>{data.res.abstract}</p>
          <a href={data.res.url} target="_blank">
            Visit Website
          </a>
        </div>
        {/* {data.res.multimedia.map((e) => {
          return <img src={e.url} style={{ width: "250px" }} alt="" />;
        })} */}
      </div>
    </div>
  );
}

export default NewsFull;
