import React from "react";

import "./Gst.css";
import Input from "../../UI/Input/Input";

const Gst = (props) => {
  return (
    <div className="Gst">
      <div className="GstBox">
        <p>GST:</p>
        <Input
          elementName={props.elementName}
          elementConfig={props.elementConfig}
          value={props.value}
          changed={props.changed}
        />
        <p>%</p>
      </div>
    </div>
  );
};

export default Gst;
