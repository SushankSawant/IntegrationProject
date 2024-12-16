import React from "react";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

function NewsFull() {
  let location = useLocation();
  let data = location.state;
  console.log(data);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-around",
        width: "100%",
      }}
    >
      <Navbar />
      <div
        style={{
          display: "flex",
          //   alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          gap: "10px",
          width: "100%",
          height: "80vh",
          borderRadius: "20px",
          background: "#242528",
          width: "60%",
          padding: "40px",
          marginTop: "10px",
        }}
      >
        <img
          src={data.res.multimedia[0].url}
          style={{ width: "450px", borderRadius: "10px" }}
          alt=""
        />
        <div className="details">
          <h1 style={{ color: "#00adb5", fontWeight: "bold" }}>
            {data.res.title}
          </h1>
          <span style={{ color: "#8f9193", fontSize: "12px" }}>
            {data.res.published_date}
          </span>
          <p
            style={{
              color: "#8f9193",
              marginTop: "10px",
              marginBottom: "10px",
              fontSize: "18px",
            }}
          >
            {data.res.abstract}
          </p>
          <a href={data.res.url} style={{ color: "#fff" }} target="_blank">
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
