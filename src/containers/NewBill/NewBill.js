import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import "./NewBill.css";
import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";
import * as actions from "../../store/actions/index";
import { setNewId, updateObject } from "../../shared/utility";

const NewBill = (props) => {
  const [step, setStep] = useState(1);
  const [bill, setBill] = useState({
    items: [],
    service: 10,
    gst: 7,
    subTotal: 0.0,
    total: 0.0,
  });
  const [people, setPeople] = useState([]);
  const [buttons] = useState({
    1: ["", "People"],
    2: ["Items", "Confirm"],
    3: ["People", ""],
  });

  const onNextHandler = () => {
    if (step < 3) {
      props.onNext(); //redux
      setStep(step + 1);
    }
    console.log(buttons[step]);
  };

  const onPrevHandler = () => {
    if (step > 1) {
      props.onPrev(); //redux
      setStep(step - 1);
    }
    console.log(buttons[step]);
  };

  const addItem = (item) => {
    const newId = setNewId(bill.items);
    const newPrice = parseFloat(item.itemPrice);
    const newItemData = updateObject(item, {
      id: newId,
      itemPrice: newPrice,
      totalQuantity: 0,
    });
    const newBill = updateObject(bill, {
      items: bill.items.concat(newItemData),
    });
    setBill(newBill);
  };

  const updateTotals = () => {
    if (bill.items.length > 0) {
      // Setsub-total
      const newTotal = bill.items
        .map((el) => el.itemPrice)
        .reduce((prev, curr) => prev + curr);
      // Set total
      const subTotal = parseFloat(newTotal);
      const totalService = subTotal + (bill.service / 100) * subTotal;
      const totalGst = totalService + (bill.gst / 100) * totalService;
      // Set the bill
      setBill(
        updateObject(bill, {
          subTotal: newTotal.toFixed(2),
          total: totalGst.toFixed(2),
        })
      );
    } else {
      setBill(bill, { subTotal: 0 });
    }
  };

  // For any async functions use this
  useEffect(() => {
    updateTotals();
  }, [bill.items]);

  return (
    <div className="NewBill">
      {step == 1 ? (
        <Items
          items={bill.items}
          step={step}
          addItem={addItem}
          updateTotals={updateTotals}
        />
      ) : null}
      {step == 2 ? <People people={people} step={step} /> : null}
      {step == 3 ? <Breakdown items={bill.items} people={people} /> : null}
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

/* REDUX */
const mapStateToProps = (state) => {
  return {
    step: state.step.step,
    items: state.bill.items,
    service: state.bill.service,
    gst: state.bill.gst,
    people: state.people.people,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNext: () => dispatch(actions.next()),
    onPrev: () => dispatch(actions.previous()),

    onAddItem: (itemData) => dispatch(actions.addItem(itemData)),
    onUpdateSubTotal: () => dispatch(actions.updateSubTotal()),
    onUpdateTotal: () => dispatch(actions.updateTotal()),

    onUpdateCharge: (inputId, value) =>
      dispatch(actions.updateCharge(inputId, value)),
    onUpdateSubTotal: () => dispatch(actions.updateSubTotal()),
    onUpdateTotal: () => dispatch(actions.updateTotal()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewBill);
/* --- */

// export default NewBill;
