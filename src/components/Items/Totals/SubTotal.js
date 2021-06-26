import React from "react";

import "./Total.css";

const SubTotal = (props) => {
  return (
    <div className="Total">
      <div className="TotalBox">
        <p>Sub-Total</p>
        <p>$ {props.subTotal}</p>
      </div>
    </div>
  );
};

export default SubTotal;
