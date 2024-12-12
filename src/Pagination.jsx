import React from "react";

const Pagination = ({ currPage, setCurrPage, arrLength, dataLimit }) => {
  let totalPage = Math.ceil(arrLength / dataLimit);

  const prevNums = Array.from({ length: 3 }, (_, i) => currPage - 1 - i)
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
          src="src/images/leftArrow.png"
          alt=""
          className="leftArrow"
          onClick={() => {
            if (currPage <= 1) {
              // alert("No pages behind!");
            } else {
              setCurrPage((p) => p - 1);
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

      {currPage < totalPage - 6 && (
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

      {/* {currPage >= 5 &&
        [1, 2].map((e, i) => {
          return (
            <button className="page-button" onClick={() => setCurrPage(i + 1)}>
              {i + 1}
            </button>
          );
        })} */}
      {/* {currPage >= 5 && <p style={{ color: "white" }}>...</p>}
      {currPage < 5 &&
        paginationNumbers
          .map((pageNumber, i) => (
            <button
              className={
                currPage == i + 1 ? "page-button activePage" : "page-button"
              }
              key={i}
              onClick={() => setCurrPage(i + 1)}
            >
              {pageNumber}
            </button>
          ))
          .slice(0, 11)} */}
      {/*   {currPage >= 5 &&
        currPage < res.pagination.last_visible_page - 6 &&
        paginationNumbers
          .map((pageNumber, i) => (
            <button
              className={
                currPage == i + 1 ? "page-button activePage" : "page-button"
              }
              key={i}
              onClick={() => setCurrPage(i + 1)}
            >
              {pageNumber}
            </button>
          ))
          .slice(currPage - 1, currPage + 5)} */}

      {/*  {currPage < res.pagination.last_visible_page - 6 && (
        <>
          <p style={{ color: "white" }}>.......</p>
          <button
            className="page-button"
            onClick={() =>
              setCurrPage(paginationNumbers[paginationNumbers.length - 1])
            }
          >
            {paginationNumbers[paginationNumbers.length - 1]}
          </button>
        </>
      )} */}
      {/*   {currPage >= res.pagination.last_visible_page - 6 &&
        paginationNumbers
          .map((pageNumber, i) => (
            <button
              className={
                currPage == i + 1 ? "page-button activePage" : "page-button"
              }
              key={i}
              onClick={() => setCurrPage(i + 1)}
            >
              {pageNumber}
            </button>
          ))
          .slice(
            res.pagination.last_visible_page - 7,
            res.pagination.last_visible_page
          )} */}
      {
        <img
          src="src/images/leftArrow.png"
          alt=""
          className="rightArrow"
          onClick={() => {
            if (currPage < totalPage /* res.pagination.last_visible_page */) {
              setCurrPage((p) => p + 1);
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
