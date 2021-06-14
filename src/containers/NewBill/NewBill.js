import React, { useState, useEffect } from "react";
// import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import "./NewBill.css";
import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";
// import * as actions from "../../store/actions/index";
import {
  setNewId,
  setNewPersonId,
  updateObject,
  calculateTotals,
  getItemAttribute,
  getPersonSharesDetails,
} from "../../shared/utility";

const NewBill = (props) => {
  const [step, setStep] = useState(1);
  const [items, setItems] = useState([]);
  const [service, setService] = useState(10);
  const [gst, setGst] = useState(7);
  const [subTotal, setSubTotal] = useState(0.0);
  const [total, setTotal] = useState(0.0);
  const [people, setPeople] = useState([]);
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
    // console.log(buttons[step]);
  };

  const onPrevHandler = () => {
    if (step > 1) {
      //   props.onPrev(); //redux
      setStep(step - 1);
    }
    // console.log(buttons[step]);
  };

  /* Items */
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

  const updateShareItems = (itemId, updateParam) => {
    const idIndex = items.map((el) => el.id).indexOf(itemId);
    let clonedItems = [...items];
    if (updateParam === "add") {
      clonedItems[idIndex] = updateObject(clonedItems[idIndex], {
        totalQuantity: clonedItems[idIndex].totalQuantity + 1,
      });
    } else {
      clonedItems[idIndex] = updateObject(clonedItems[idIndex], {
        totalQuantity: clonedItems[idIndex].totalQuantity - 1,
      });
    }
    setItems(clonedItems);
    // return updateObject(state, { items: clonedItems });
  };

  // Update totals
  useEffect(() => {
    if (items.length > 0) {
      const { subTtl, ttl } = calculateTotals(items, service, gst);
      setSubTotal(subTtl);
      setTotal(ttl);
    } else {
      //   setBill(updateObject(bill, { subTotal: 0, total: 0 }));
      setSubTotal(0);
      setTotal(0);
    }
  }, [items, service, gst]);

  /* --- */

  /* People */
  const addPerson = (person) => {
    // Create new person
    const newPerson = updateObject(person, {
      id: setNewPersonId(people),
      personName: person.personName,
      shares: [],
    });
    // Add new person data into state
    setPeople(people.concat(newPerson));
    // return updateObject(state, { people: state.people.concat(newPerson) });
  };

  const addShare = (itemId, personId) => {
    // Get person shares details with helper function and destructuring
    const { personIdIndex, personShares, personSharesIdList } =
      getPersonSharesDetails(people, personId);
    // Check if current itemId is in person's shares
    let share = {};
    let alreadyExists = false;
    let personShareIdIndex = null;
    // if already exists update share, else create new share
    if (personSharesIdList.includes(itemId)) {
      // console.log('Item already exists')
      personShareIdIndex = personSharesIdList.indexOf(itemId);
      share = {
        ...personShares[personShareIdIndex],
        quantity: personShares[personShareIdIndex].quantity + 1,
      };
      alreadyExists = true;
    } else {
      // console.log('Item does not exists')
      share = {
        itemId: itemId,
        itemName: getItemAttribute(items, itemId, "itemName"),
        itemPrice: getItemAttribute(items, itemId, "itemPrice"),
        quantity: 1,
      };
    }
    // dispatch({
    //   type: actionTypes.ADD_SHARE,
    //   shareData: share,
    //   alreadyExists: alreadyExists,
    //   personIdIndex: personIdIndex,
    //   personShareIdIndex: personShareIdIndex,
    // });
    let newShares = [...people[personIdIndex].shares];
    if (alreadyExists) {
      // Replace old share obj
      newShares[personShareIdIndex] = share;
    } else {
      // Add new share obj
      newShares.push(share);
    }
    // Replace old person obj
    const newPerson = updateObject(people[personIdIndex], {
      shares: newShares,
    });
    let clonedPeople = [...people];
    clonedPeople[personIdIndex] = newPerson;
    // Update state
    setPeople(clonedPeople);
    // return updateObject(state, { people: clonedPeople });
  };

  const deleteShare = (itemId, personId) => {
    const { personIdIndex, personShares, personSharesIdList } =
      getPersonSharesDetails(people, personId);
    // Check if last share in person's shares
    let share = {};
    let shouldDelete = false;
    const personShareIdIndex = personSharesIdList.indexOf(itemId);
    // If last share, delete share, else reduce quantity by 1
    if (personShares[personSharesIdList.indexOf(itemId)].quantity === 1) {
      shouldDelete = true;
    } else {
      share = {
        ...personShares[personShareIdIndex],
        quantity: personShares[personShareIdIndex].quantity - 1,
      };
    }
    // dispatch({
    //   type: actionTypes.DELETE_SHARE,
    //   shareData: share,
    //   shouldDelete: shouldDelete,
    //   personIdIndex: personIdIndex,
    //   personShareIdIndex: personShareIdIndex,
    // });
    let newShares = [...people[personIdIndex].shares];
    if (shouldDelete) {
        newShares.splice(personShareIdIndex, 1);
    } else {
        // Replace old share obj 
        newShares[personShareIdIndex] = share;
    }
    // Replace old person obj
    const newPerson = updateObject(people[personIdIndex], { shares: newShares });
    let clonedPeople = [...people];
    clonedPeople[personIdIndex] = newPerson;
    // Update state
    setPeople(clonedPeople)
    // return updateObject(state, { people: clonedPeople });
  };

  /* --- */

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
      {step === 2 ? (
        <People
          items={items}
          people={people}
          step={step}
          addPerson={addPerson}
          updateShareItems={updateShareItems}
          addShare={addShare}
          deleteShare={deleteShare}
        />
      ) : null}
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
