import React from "react";
import SubTotal from "./SubTotal";
import Total from "./Total";

const Totals = (props) => {
  return (
    <div>
      <SubTotal subTotal={props.subTotal} />
      <Total total={props.total} />
    </div>
  );
};

export default Totals;