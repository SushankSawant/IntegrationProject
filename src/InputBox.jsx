import React from "react";
// import "./InputBox.css";
import openEye from "./assets/images/openEye.png";
import closedEye from "./assets/images/closedEye.png";

function InputBox({ title = "", type = "text", id, errorFound, ...props }) {
  function toggleIcon() {
    console.log("clicked");
    let showIcon = document.querySelector(`.input_${id}`);
    let toggleValue = showIcon.getAttribute("data-show");
    // console.log(toggleValue);
    let value = toggleValue === "true" ? "false" : "true";
    showIcon.setAttribute("data-show", value);

    if (value === "true") {
      showIcon.src = openEye;
      document.getElementById(`${id}`).type = "password";
    } else {
      showIcon.src = closedEye;
      document.getElementById(`${id}`).type = "text";
    }
    // showIcon.querySelector('[data-show]');
    // console.log(showIcon);
  }
  /*  function renderIcon() {
    return (
      
    );
  } */
  return (
    <div className="inputHolder">
      {title && <label htmlFor={id}>{title}</label>}

      <input
        {...props}
        type={type}
        className={`input__style ${props?.className ?? ""}`}
        onFocus={(e) => {
          document.getElementById(`${id}`).classList.remove("error");
          props?.onFocus(e);
          /*  if (id === "password") {
            props?.onFocus(e);
          } */
        }}
        id={id}
      />
      {type === "password" && (
        <img
          src={openEye}
          data-show={true}
          alt=""
          className={`showIcon input_${id}`}
          // className="showIcon"
          onClick={toggleIcon}
        />
      )}
    </div>
  );
}

export default InputBox;
