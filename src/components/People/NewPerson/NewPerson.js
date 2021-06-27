import React, { useState } from "react"; 
import { Button } from "@material-ui/core";

import "./NewPerson.css";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";

const NewPerson = (props) => {
  const [controls, setControls] = useState({
    personName: {
      elementName: "personName",
      elementConfig: {
        type: "text",
        placeholder: "E.g. Sam",
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

  const clearInputs = () => {
    const newPersonName = updateObject(controls.personName, {
      value: "",
      valid: false,
    });
    const newControls = updateObject(controls, {
      personName: newPersonName,
    });
    setControls(newControls);
    setFormIsValid(false);
  };

  const personAddHandler = (event) => {
    event.preventDefault();
    const person = {
      personName: controls.personName.value,
    };
    props.addPerson(person);
    // Clear inputs and focus
    clearInputs();
  };

  return (
    <>
      <h3>People</h3>
      <div className="NewPerson">
        <form onSubmit={personAddHandler}>
          <Input
            elementName={controls.personName.elementName}
            elementConfig={controls.personName.elementConfig}
            value={controls.personName.value}
            changed={(event) =>
              inputChangedHandler(event, controls.personName.elementName)
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

export default NewPerson