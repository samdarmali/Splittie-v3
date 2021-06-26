import React from "react";

import "./Total.css";

const Total = (props) => {
  return (
    <div className="Total" style={{ marginBottom: "10px" }}>
      <div className="TotalBox">
        <p>Total</p>
        <p>$ {props.total}</p>
      </div>
    </div>
  );
};

export default Total;