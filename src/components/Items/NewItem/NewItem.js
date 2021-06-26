import React, { useState, useRef } from "react"; 
import { Button } from "@material-ui/core";

import "./NewItem.css";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";

const NewItem = (props) => {
  const itemNameRef = useRef(null);
  const [controls, setControls] = useState({
    itemName: {
      elementName: "itemName",
      elementConfig: {
        type: "text",
        placeholder: "E.g. Chicken",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    itemCost: {
      elementName: "itemCost",
      elementConfig: {
        type: "number",
        placeholder: "0.00",
        inputProps: {
          min: "0.00",
          step: "0.01",
        },
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputId) => {
    // Update form element
    const updatedFormElement = updateObject(controls[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, controls[inputId].validation),
      touched: true,
    });
    // Update whole form
    const updatedForm = updateObject(controls, {
      [inputId]: updatedFormElement,
    });
    // Validation
    let isValid = true;
    for (let inputId in updatedForm) {
      isValid = updatedForm[inputId].valid && isValid;
    }
    // Update form state
    setControls(updatedForm);
    setFormIsValid(isValid);
  };

  const itemAddHandler = (event) => {
    event.preventDefault();
    const item = {
      itemName: controls.itemName.value,
      itemPrice: controls.itemCost.value,
    };
    props.addItem(item);
    // Clear inputs and focus
    clearInputs();
    itemNameRef.current.focus();
  };

  const clearInputs = () => {
    const newitemName = updateObject(controls.itemName, {
      value: "",
      valid: false,
    });
    const newitemCost = updateObject(controls.itemCost, {
      value: "",
      valid: false,
    });
    const newControls = updateObject(controls, {
      itemName: newitemName,
      itemCost: newitemCost,
    });
    setControls(newControls);
    setFormIsValid(false);
  };

  return (
    <>
      <h3>Items</h3>
      <div className="NewItem">
        <form onSubmit={itemAddHandler}>
          <Input
            refr={itemNameRef}
            disabled={false}
            elementName={controls.itemName.elementName}
            elementConfig={controls.itemName.elementConfig}
            value={controls.itemName.value}
            changed={(event) =>
              inputChangedHandler(event, controls.itemName.elementName)
            }
          />
          <Input
            elementName={controls.itemCost.elementName}
            elementConfig={controls.itemCost.elementConfig}
            value={controls.itemCost.value}
            changed={(event) =>
              inputChangedHandler(event, controls.itemCost.elementName)
            }
          />
          <div>
            <Button disabled={!formIsValid} variant="contained" type="submit">
              ADD
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewItem;
