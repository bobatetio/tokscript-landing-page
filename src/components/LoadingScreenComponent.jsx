import ProgressBar from "react-bootstrap/ProgressBar";

import SpinnerIcon from "../assets/images/icons/spinner-white-icon.svg";
import Image from "next/image";

export default function LoadingScreenComponent({
  completion,
  heading,
  text1,
  text2,
}) {
  return (
    <div className="loading-screen-component">
      <div className="main-wrapper">
        <div className="spinner-icon">
          {/* <Spinner animation="border" /> */}
          <Image src={SpinnerIcon} alt="" className="SpinnerIcon" />
        </div>
        <div className="content-wrapper">
          <strong className="white">{heading}</strong>
          <p>
            {text1} <br />
            {text2}
          </p>
        </div>
        <div className="progress-bar-wrapper">
          <ProgressBar now={completion} />
        </div>
      </div>
    </div>
  );
}
