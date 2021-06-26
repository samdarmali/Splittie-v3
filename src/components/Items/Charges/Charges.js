import React, { useState, useEffect } from "react";

import Service from "./Service";
import Gst from "./Gst";
import { updateObject } from "../../../shared/utility";

const Charges = (props) => {
  const [controls, setControls] = useState({
    service: {
      elementName: "service",
      elementConfig: {
        type: "number",
        placeholder: "0",
        min: "0",
        step: "1",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    gst: {
      elementName: "gst",
      elementConfig: {
        type: "number",
        placeholder: "0",
        min: "0",
        step: "1",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });

  const inputChangedHandler = (event, inputId) => {
    // Update form element
    const updatedFormElement = updateObject(controls[inputId], {
      value: event.target.value,
    });
    // Update whole form
    const updatedForm = updateObject(controls, {
      [inputId]: updatedFormElement,
    });
    // Update form state
    setControls(updatedForm);
    // Update charges
    props.updateCharge(inputId, event.target.value);
  };

  useEffect(() => {
    // Update values of service and gst when comp mounts
    setControls((controls) => ({
      ...controls,
      service: updateObject(controls.service, { value: props.service }),
      gst: updateObject(controls.gst, { value: props.gst }),
    }));
  }, [props.service, props.gst]);

  return (
    <div>
      <Service
        elementName={controls.service.elementName}
        elementConfig={controls.service.elementConfig}
        value={controls.service.value}
        changed={(event) =>
          inputChangedHandler(event, controls.service.elementName)
        }
      />
      <Gst
        elementName={controls.gst.elementName}
        elementConfig={controls.gst.elementConfig}
        value={controls.gst.value}
        changed={(event) =>
          inputChangedHandler(event, controls.gst.elementName)
        }
      />
    </div>
  );
};

export default Charges;