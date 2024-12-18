import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./Context/Feed.css";
import Card from "./Card";
import AxiosInstances from "./AxiosInstances";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Pagination from "./Pagination";
import Dropdown from "./DropDown";

function Feed() {
  const [feedArray, setFeedArray] = useState();
  const [searchParam, setSearchParam] = useSearchParams();

  const [currPage, setCurrPage] = useState(searchParam.get("pageno") || 1);
  const [searchInput, setSearchInput] = useState({
    word: "",
    number: searchParam.get("dataLength") || "8",
  });

  useEffect(() => {
    AxiosInstances.get(
      `/view_data?page_no=${currPage}&page_size=${searchInput.number}&keyword=${searchInput.word}`
    )
      .then((res) => {
        // console.log(res);
        setFeedArray(res.data);
      })
      .catch((err) => console.log(err));

    setSearchParam((params) => {
      params.set("pageno", currPage);
      params.set("dataLength", searchInput.number);

      return params;
    });
  }, [currPage, searchInput.number]);
  // console.log(feedArray);
  return (
    <div>
      {/* <Navbar /> */}
      <form className="search_userList">
        <input
          type="text"
          placeholder="Enter Search Input..."
          onChange={(e) => {
            setSearchInput((p) => ({
              ...p,
              word: e.target.value,
            }));
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            AxiosInstances.get(
              // /testappview_data?page_no=1&page_size=8
              `/view_data?page_no=${currPage}&page_size=${searchInput.number}&keyword=${searchInput.word}`
            )
              .then((res) => {
                // console.log(res);
                setFeedArray(res.data);
              })
              .catch((err) => console.log(err));
          }}
        >
          🔎
        </button>
        <Dropdown
          selectedData={searchInput?.number}
          dropTitle={"data limit"}
          onchange={(e) => {
            setSearchInput((p) => ({
              ...p,
              number: e,
            }));
            setCurrPage(1);
          }}
          reqArr={["8", "12", "16"]}
        />
      </form>
      <div className="cardWrapper">
        {feedArray?.results?.map((e, i) => {
          return (
            <Card
              key={`newscard_${i}`}
              imgsrc={e.multimedia?.[0].url}
              title={e.title}
              author={e.byline}
              pub_date={e.published_date}
              res={e}
            />
          );
        })}
        {Math.ceil(feedArray?.total_results / feedArray?.page_size) > 1 && (
          <Pagination
            currPage={/* currPage */ Number(currPage)}
            setCurrPage={setCurrPage}
            arrLength={feedArray?.total_results}
            // arrLength={10}
            dataLimit={feedArray?.page_size}
            setSearchParam={setSearchParam}
          />
        )}
      </div>
    </div>
  );
}

export default Feed;
