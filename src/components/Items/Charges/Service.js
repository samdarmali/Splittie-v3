import React from "react";

import classes from "./Service.module.css";
import Input from "../../UI/Input/Input";

const Service = (props) => {
  return (
    <div className={classes.Service}>
      <div className={classes.ServiceBox}>
        <p>Service:</p>
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

export default Service;
