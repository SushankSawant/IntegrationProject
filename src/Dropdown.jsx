import React, { useState, useEffect, useRef, useMemo } from "react";

function Dropdown({
  dropTitle,
  reqArr,
  selectedData,
  setSelectedData,
  type = "single",
  /*   setSelectedState,
  setSelectedCity,
  setSearchParams, */
  onchange,
  id,
  onFocus,
  onchangeMulti,
  dataType = "string",
  dataToDisplay,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const dropSearch = useRef();
  const [searchIn, setSearchIn] = useState("");
  const dropContentRef = useRef();

  useEffect(() => {
    function handleOutClick(e) {
      if (!dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
        setSearchIn("");
      }
    }
    document.addEventListener("click", handleOutClick);

    return () => {
      document.removeEventListener("click", handleOutClick);
    };
  }, []);

  function handleAddArray(ele, ind) {
    /*  setSelectedData((prev) => {
      if (prev.includes(ele)) {
        let updatedList = prev.filter((e) => e !== ele);
        return updatedList;
      } else {
        return [...prev, ele];
      }
    }); */
    if (dataType === "string") {
      onchangeMulti(ele);
    } else if (dataType === "objects") {
      onchangeMulti(selectedData == ele[dataToDisplay] ? "" : ele);
    }
    // console.log("clicked");
  }

  function handleAddString(ele, ind) {
    if (dataType === "string") {
      onchange(selectedData == ele ? "" : ele);
    } else if (dataType === "objects") {
      onchange(selectedData == ele[dataToDisplay] ? "" : ele);
    }
    setIsDropdownOpen(false);
  }
  let filterList = useMemo(
    () =>
      reqArr?.filter((e) => {
        if (searchIn !== "") {
          return dataType === "string"
            ? e.toLowerCase().includes(searchIn.toLowerCase())
            : e[dataToDisplay].toLowerCase().includes(searchIn.toLowerCase());
        } else {
          return e;
        }
      }),
    [searchIn, reqArr]
  );
  useEffect(() => {
    const container = document.querySelector(".dropContent-open");
    let ele;
    if (type == "single") {
      ele = document.querySelector(".active_dd_option");
    } else {
      ele = document.querySelectorAll(".active_dd_option")[0];
    }
    if (ele) {
      container.scrollTop = ele.offsetTop - 40;
    }
  }, [isDropdownOpen]);

  return (
    <div
      id={dropTitle}
      className={
        reqArr?.length > 0 ? "dropDownHolder" : "dropDownHolder hidden"
      }
      ref={dropdownRef}
    >
      <button
        className="selectButton"
        id={id}
        onFocus={onFocus}
        // {...props?.onFocus}
        onClick={(e) => {
          e.preventDefault();
          setIsDropdownOpen(isDropdownOpen ? false : true);
          setSearchIn("");
          // dropSearch.current.focus();
          // selectedRef.current.scrollIntoView();
        }}
      >
        {!selectedData || selectedData.length == 0 ? (
          <>
            {dropTitle}
            <img
              src="src\images\dropdown.png"
              alt=""
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </>
        ) : (
          <>
            <p title={selectedData.toString()}>{selectedData.toString()}</p>
            <img
              src="src\images\dropdown.png"
              alt=""
              style={{
                transform: isDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </>
        )}
      </button>
      {isDropdownOpen ? (
        <ul
          className={
            isDropdownOpen ? "dropContent dropContent-open" : "dropContent"
          }
          ref={dropContentRef}
        >
          <input
            type="text"
            value={searchIn}
            // ref={dropSearch}
            autoFocus
            onChange={(e) => setSearchIn(e.target.value)}
          />
          {/* {selectedEle && selectedEle} */}
          {filterList?.map((e, i) => {
            return (
              <li
                key={i}
                // className={`option_${i}`}
                className={
                  selectedData?.includes(e) ||
                  selectedData == e?.[dataToDisplay]
                    ? "active_dd_option"
                    : ""
                }
                onClick={() =>
                  type == "multiple"
                    ? handleAddArray(e, i)
                    : handleAddString(e, i)
                }
                // ref={selectedEle === e && selectedRef}
              >
                {dataType === "string" ? e : e[dataToDisplay]}
                {/*  {dataType == "string"
                    ? selectedData.includes(e) && (
                        <img src="src\images\tick.png" />
                      )
                    : selectedData == e[dataToDisplay] && (
                        <img src="src\images\tick.png" />
                      )} */}
                {/* {(selectedData?.includes(e) ||
                  selectedData == e?.[dataToDisplay]) && (
                  <img src="src\images\tick.png" />
                )} */}
              </li>
            );
          })}
        </ul>
      ) : (
        <ul className="dropContent"></ul>
      )}
    </div>
  );
}

export default Dropdown;
