import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import "./NewBill.css";
import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";
// import * as actions from "../../store/actions/index";
import { setNewId, updateObject, calculateTotals } from "../../shared/utility";

const NewBill = (props) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [service, setService] = useState(10);
  const [gst, setGst] = useState(7);
  const [subTotal, setSubTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);
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
      id: setNewId(items),
      itemPrice: parseFloat(item.itemPrice),
      totalQuantity: 0,
    });
    setItems(items.concat(newItemData));
  };

  const deleteItem = (id) => {
    const idIndex = items.map((el) => el.id).indexOf(id);
    let clonedItems = [...items];
    if (idIndex > -1) {
      clonedItems.splice(idIndex, 1);
    }
    setItems(clonedItems);
  };

  const updateCharge = (chargeType, val) => {
    // Set charge state
    chargeType === "service" ? setService(val) : setGst(val);
  };

  // Update totals
  useEffect(() => {
    if (items.length > 0) {
      const {subTtl, ttl} = calculateTotals(items, service, gst);
      setSubTotal(subTtl);
      setTotal(ttl);
    } else {
      //   setBill(updateObject(bill, { subTotal: 0, total: 0 }));
      setSubTotal(0);
      setTotal(0);
    }
  }, [items, service, gst]);

  return (
    <div className="NewBill">
      {step === 1 ? (
        <Items
          items={items}
          step={step}
          addItem={addItem}
          deleteItem={deleteItem}
          updateCharge={updateCharge}
          service={service}
          gst={gst}
          subTotal={subTotal}
          total={total}
        />
      ) : null}
      {step === 2 ? <People people={people} step={step} /> : null}
      {step === 3 ? <Breakdown items={items} people={people} /> : null}
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
