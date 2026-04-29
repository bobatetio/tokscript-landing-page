import React from "react";
import Image from "next/image";

import backwardTime from "../assets/images/icons/backward-time.svg";

export default function SavedToHistory() {
  return (
    <div className="saved-to-history-component">
      <div className="icon-wrapper">
        <Image src={backwardTime} alt="Backward Time" />
      </div>
      <div className="text-wrapper">
        <strong className="w-600 white">Saved To History</strong>
        <p className="small">Item saved to your history</p>
      </div>
    </div>
  );
}
