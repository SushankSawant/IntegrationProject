import React from "react";
import arrow from "../images/leftArrow.png";

const Pagination = ({
  currPage,
  setCurrPage,
  arrLength,
  dataLimit,
  setSearchParam,
}) => {
  let totalPage = Math.ceil(arrLength / dataLimit);
  console.log(arrLength, "ARR LENGTH");
  console.log(dataLimit, "total length");

  const prevNums = Array.from({ length: 2 }, (_, i) => currPage - 1 - i)
    .filter((e, i) => e > 0)
    .reverse();
  const nextNums = Array.from({ length: 5 }, (_, i) => currPage + i).filter(
    (e, i) => e <= totalPage
  );

  const paginationNumbers = [...prevNums, ...nextNums];

  return (
    <div className="pagination">
      {
        <img
          src={arrow}
          alt=""
          className="leftArrow"
          onClick={() => {
            if (currPage <= 1) {
              // alert("No pages behind!");
            } else {
              setCurrPage((p) => p - 1);
              setSearchParam((p) => {
                p.set("pageno", currPage - 1);
                return p;
              });
            }
          }}
        />
      }

      {currPage >= 5 && (
        <>
          <button className="page-button" onClick={() => setCurrPage(1)}>
            1
          </button>
          <button className="page-button" onClick={() => setCurrPage(2)}>
            2
          </button>
          <p style={{ color: "white" }}>...</p>
        </>
      )}

      {paginationNumbers.map((e, i) => {
        return (
          <button
            key={i}
            className={currPage == e ? "page-button activePage" : "page-button"}
            onClick={() => setCurrPage(e)}
          >
            {e}
          </button>
        );
      })}

      {currPage < totalPage - 4 && (
        <>
          <p style={{ color: "white" }}>.......</p>
          <button
            className="page-button"
            onClick={() =>
              setCurrPage(totalPage /* res.pagination.last_visible_page */)
            }
          >
            {totalPage /* res.pagination.last_visible_page */}
          </button>
        </>
      )}

      {
        <img
          src={arrow}
          alt=""
          className="rightArrow"
          onClick={() => {
            if (currPage < totalPage /* res.pagination.last_visible_page */) {
              setCurrPage(currPage + 1);
              setSearchParam((p) => {
                p.set("pageno", currPage + 1);
                return p;
              });
            } else {
              alert("Last Page Reached!");
            }
          }}
        />
      }
    </div>
  );
};
export default Pagination;
