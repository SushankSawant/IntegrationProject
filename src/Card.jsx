import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import star from "../../images/star.png";

function Card({
  imgsrc,
  title,
  id,
  res,
  author,
  pub_date,
  setLocRecent,
  locRecent,
}) {
  const [hover, setHover] = useState(false);

  const navigate = useNavigate();

  function navFull() {
    /* let restored = localStorage.getItem("new");
    restored = restored ? JSON.parse(restored) : [];
    // console.log(restored, "RESTORED");
    restored.push(
      JSON.stringify({ title: title, img: imgsrc, id: id, res: res })
    );
    console.log(restored, "restored"); */
    // localStorage.setItem("new", JSON.stringify(restored));
    navigate(`/fullpagenews`, { state: { res } });
  }

  return (
    <div
      className="card"
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => {
        setHover(false);
      }}
      onClick={navFull}
    >
      {/* <a href={e.url} target="_blank"> */}
      <div className="imagesec">
        <div className={hover ? "hoverEle showHoverEle" : "hoverEle"}>
          <img src="src\images\fullscreen.png" alt="" />
          <p>Read This</p>
        </div>
        <img src={imgsrc} alt="" className="animeImg" />
      </div>
      <div className="animeDetail">
        <h3>{title}</h3>
        <p>{author}</p>
        <span>{pub_date}</span>
        {/*  <div className="ratingsec">
          {[1, 2, 3, 4, 5].map((e, i) => {
            return <img key={i} src={star} alt="" />;
          })}
        </div> */}
      </div>
      {/* </a> */}
    </div>
  );
}

export default Card;
