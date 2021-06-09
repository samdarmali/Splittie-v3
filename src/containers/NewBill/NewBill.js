import React, { useState } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import "./NewBill.css";
import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";

const NewBill = (props) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [people, setPeople] = useState([]);
  const [buttons] = useState({
    1: ["", "People"],
    2: ["Items", "Confirm"],
    3: ["People", ""],
  });

  const onNextHandler = () => {
    if (step < 3) {
        setStep(step + 1);
    }
    console.log(buttons[step]);
  };

  const onPrevHandler = () => {
    if (step > 1) {
        setStep(step - 1);
    }
    console.log(buttons[step]);
  };

  return (
    <div className="NewBill">
      {step == 1 ? <Items items={items} step={step} /> : null}
      {step == 2 ? <People people={people} step={step} /> : null}
      {step == 3 ? <Breakdown /> : null}
      <div className="ButtonDiv">
        <Button variant="contained" onClick={onPrevHandler}>
          <NavigateBefore />
          {buttons[step][0]}
        </Button>
        <Button variant="contained" onClick={onNextHandler}>
          {buttons[step][1]}
          <NavigateNext />
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    step: state.step.step,
    items: state.bill.items,
    people: state.people.people,
  };
};

// export default connect(mapStateToProps)(NewBill);
export default NewBill;
