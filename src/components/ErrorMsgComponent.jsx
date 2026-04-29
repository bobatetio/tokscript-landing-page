import React from "react";

import errorIcon from "../assets/images/icons/error-icon.svg";
import closeIcon from "../assets/images/icons/close-icon.svg";

export default function ErrorMsgComponent({ errorMsg, title }) {
  return (
    <div className="error-msg-wrapper">
      <div className="icon">
        <img src={errorIcon} alt="Error" />
      </div>
      <div className="text">
        <strong>{title} </strong>
        <p className="small">{errorMsg}</p>
      </div>
      <button className="close-icon">
        <img src={closeIcon} alt="Close" />
      </button>
    </div>
  );
}
