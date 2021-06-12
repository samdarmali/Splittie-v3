import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import "./NewBill.css";
import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";
// import * as actions from "../../store/actions/index";
import { setNewId, updateObject } from "../../shared/utility";

const NewBill = (props) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [service, setService] = useState(10);
  const [gst, setGst] = useState(7);
  const [subtotal, setSubtotal] = useState(0.0);
  const [total, seTtotal] = useState(0.0);
  const [bill, setBill] = useState({
    items: [],
    service: 10,
    gst: 7,
    subTotal: 0.0,
    total: 0.0,
  });
  const [people] = useState([]); //setPeople
  const [buttons] = useState({
    1: ["", "People"],
    2: ["Items", "Confirm"],
    3: ["People", ""],
  });

  const onNextHandler = () => {
    if (step < 3) {
    //   props.onNext(); //redux
      setStep(step + 1);
    }
    console.log(buttons[step]);
  };

  const onPrevHandler = () => {
    if (step > 1) {
    //   props.onPrev(); //redux
      setStep(step - 1);
    }
    console.log(buttons[step]);
  };

  const addItem = (item) => {
    const newItemData = updateObject(item, {
      id: setNewId(bill.items),
      itemPrice: parseFloat(item.itemPrice),
      totalQuantity: 0,
    });
    setBill(
      updateObject(bill, {
        items: bill.items.concat(newItemData),
      })
    );
  };

  const deleteItem = (id) => {
    const idIndex = bill.items.map((el) => el.id).indexOf(id);
    let clonedItems = [...bill.items];
    if (idIndex > -1) {
      clonedItems.splice(idIndex, 1);
    }
    setBill(updateObject(bill, { items: clonedItems }));
  };

  const updateCharge = (chargeType, val) => {
    setBill(updateObject(bill, { [chargeType]: val }));
  };

  // Update totals
  useEffect(() => {
    if (bill.items.length > 0) {
      // Setsub-total
      const newTotal = bill.items
        .map((el) => el.itemPrice)
        .reduce((prev, curr) => prev + curr);
      // Set total
      const totalService =
        parseFloat(newTotal) + (bill.service / 100) * parseFloat(newTotal);
      const totalGst = totalService + (bill.gst / 100) * totalService;
      // Set the bill
      setBill(
        updateObject(bill, {
          subTotal: newTotal.toFixed(2),
          total: totalGst.toFixed(2),
        })
      );
    } else {
      setBill(updateObject(bill, { subTotal: 0, total: 0 }));
    }
  }, [bill.items, bill.service, bill.gst]);

  return (
    <div className="NewBill">
      {step === 1 ? (
        <Items
          items={bill.items}
          step={step}
          addItem={addItem}
          deleteItem={deleteItem}
          updateCharge={updateCharge}
          service={bill.service}
          gst={bill.gst}
          subTotal={bill.subTotal}
          total={bill.total}
        />
      ) : null}
      {step === 2 ? <People people={people} step={step} /> : null}
      {step === 3 ? <Breakdown items={bill.items} people={people} /> : null}
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

export default NewBill;

/* REDUX */
// const mapStateToProps = (state) => {
//   return {
//     step: state.step.step,
//     items: state.bill.items,
//     service: state.bill.service,
//     gst: state.bill.gst,
//     people: state.people.people,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onNext: () => dispatch(actions.next()),
//     onPrev: () => dispatch(actions.previous()),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(NewBill);
/* --- */
