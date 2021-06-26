import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { NavigateNext, NavigateBefore } from "@material-ui/icons";

import "./NewBill.css";
import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";
import {
  setNewId,
  setNewPersonId,
  updateObject,
  calculateTotals,
  getItemAttribute,
  getPersonSharesDetails,
  updateTotal,
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

  /* Buttons */
  const onNextHandler = () => {
    if (step < 3) {
      if (buttons[step][1] === "Confirm") {
        updateBreakdown();
      }
      setStep(step + 1);
    }
  };

  const onPrevHandler = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  //   const handleConfirm = () => {
  //     // Update share totalQuantity
  //     this.props.onUpdateTotalQuantity();
  //     this.props.onNext();
  //   };
  /* --- */

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
  };

  const deleteAllShares = (itemId) => {
    const newPeople = people.map((person) => {
      if (person.shares.length > 0) {
        // Find itemId index in shares array
        const idIndex = person.shares.map((el) => el.itemId).indexOf(itemId);
        // Delete share if exists
        if (idIndex > -1) {
          let newShares = [...person.shares];
          newShares.splice(idIndex, 1);
          const newPerson = updateObject(person, { shares: newShares });
          return newPerson;
        } else {
          return person;
        }
      } else {
        return person;
      }
    });
    // Update people
    setPeople(newPeople);
  };

  // Update totals
  useEffect(() => {
    if (items.length > 0) {
      const { subTtl, ttl } = calculateTotals(items, service, gst);
      setSubTotal(subTtl);
      setTotal(ttl);
    } else {
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
  };

  const deletePerson = (personId) => {
    const idIndex = people.map((el) => el.id).indexOf(personId);
    let clonedPeople = [...people];
    if (idIndex > -1) {
      clonedPeople.splice(idIndex, 1);
    }
    // Delete person from state
    setPeople(clonedPeople);
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
    // Update poeple
    setPeople(clonedPeople);
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
    let newShares = [...people[personIdIndex].shares];
    if (shouldDelete) {
      newShares.splice(personShareIdIndex, 1);
    } else {
      // Replace old share obj
      newShares[personShareIdIndex] = share;
    }
    // Replace old person obj
    const newPerson = updateObject(people[personIdIndex], {
      shares: newShares,
    });
    let clonedPeople = [...people];
    clonedPeople[personIdIndex] = newPerson;
    // Update people
    setPeople(clonedPeople);
  };
  /* --- */

  /* Breakdown */
  const updateBreakdown = () => {
    const newPeople = people.map((person) => {
      // Update shares array with item price, total qty, fraction and decimal attributes
      const newShares = person.shares.map((share) => {
        const idIndex = items.map((el) => el.id).indexOf(share.itemId);
        const itemPrice = items[idIndex].itemPrice;
        const totalQuantity = items[idIndex].totalQuantity;
        const fraction =
          share.quantity.toString() + "/" + totalQuantity.toString();
        return updateObject(share, {
          itemPrice: itemPrice,
          totalQuantity: totalQuantity,
          fraction: fraction,
          decimal: share.quantity / totalQuantity,
          sharePrice: (share.quantity / totalQuantity) * itemPrice,
        });
      });
      // Give person a total and sub-total
      const personSubTotal = newShares
        .map((el) => el.sharePrice)
        .reduce((a, b) => a + b, 0);
      const personTotal = updateTotal(personSubTotal, service, gst);
      // Update person
      return updateObject(person, {
        shares: newShares,
        subTotal: personSubTotal,
        total: personTotal,
      });
    });
    // Update people
    setPeople(newPeople);
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
          deleteAllShares={deleteAllShares}
        />
      ) : step === 2 ? (
        <People
          items={items}
          people={people}
          step={step}
          addPerson={addPerson}
          deletePerson={deletePerson}
          updateShareItems={updateShareItems}
          addShare={addShare}
          deleteShare={deleteShare}
        />
      ) : step === 3 ? (
        <Breakdown items={items} people={people} total={total} />
      ) : null}
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