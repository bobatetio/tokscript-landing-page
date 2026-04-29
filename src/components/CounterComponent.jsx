import React from "react";

export default function CounterComponent({ counterData }) {
  const defaultData = [
    {
      amount: "2.6M+",
      description: "Videos Processed",
      changeColorTitle: "yellow",
    },
    {
      amount: "190K+",
      description: "Profiles Downloaded",
      changeColorTitle: "purple",
    },
    {
      amount: "120K+",
      description: "Hours Saved",
      changeColorTitle: "cyan",
    },
    {
      amount: "84M+",
      description: "Minutes of videos total",
      changeColorTitle: "pink",
    },
  ];

  const colorMap = ["yellow", "purple", "cyan", "pink"];
  const users = counterData
    ? counterData.map((item, i) => ({ ...item, changeColorTitle: colorMap[i] || "yellow" }))
    : defaultData;

  return (
    <>
      <div className="counter-component-wrapper">
        <div className="inner-wrapper">
          <div className="row gy-4">
            {users.map((user, index) => (
              <div className="col-md-3 col-6" key={index}>
                <div className={`card-wrapper ${user.card1}`}>
                  <div className="title">
                    <span className={`${user.changeColorTitle}`}>
                      {user.amount}
                    </span>
                  </div>
                  <div className="text">
                    <p className={`${user.changeColorTitle}`}>
                      {user.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
