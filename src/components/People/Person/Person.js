import React, { useState, useRef } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import "./Person.css";

const Person = (props) => {
  const [value, setValue] = useState("");
  const menuItemRef = useRef(null);

  const handleAdd = (itemId, personId) => {
    setValue(itemId);
    props.updateShareItems(itemId, "add");
    props.addShare(itemId, personId);
  };

  const handleDelete = (itemId, personId) => {
    props.updateShareItems(itemId, "delete");
    props.deleteShare(itemId, personId);
  };

  // Map item object into array of jsx elements
  const createMenuItems = () => {
    const transformedItems = Object.keys(props.items).map((igKey) => {
      const i = props.items[igKey];
      return (
        <MenuItem
          ref={menuItemRef}
          key={i.id}
          id={i.id}
          value={i.id}
          onClick={() => handleAdd(i.id, props.id)}
        >
          {i.itemName}
        </MenuItem>
      );
    });
    return transformedItems;
  };

  // Create array of MUI Chips
  const createMuiChips = () => {
    const personIndex = props.people.map((el) => el.id).indexOf(props.id);
    const transformedShares = props.people[personIndex].shares.map((el) => {
      const label = el.itemName + " x " + el.quantity;
      return (
        <Chip
          style={{ margin: "2px" }}
          key={el.itemId}
          label={label}
          onClick={() => handleAdd(el.itemId, props.id)}
          onDelete={() => handleDelete(el.itemId, props.id)}
        />
      );
    });
    return transformedShares;
  };

  return (
    <div className="PersonWrapper">
      <div className="Person" key={props.id} id={props.id}>
        <div className="PersonBox">
          <p>{props.personName}</p>
          <FormControl className="ItemBox">
            <InputLabel className="InputLabel">Select Item</InputLabel>
            <Select className="Selector" value={value}>
              {createMenuItems()}
            </Select>
          </FormControl>
        </div>
        <IconButton edge="end" onClick={() => props.deletePerson(props.id)}>
          <Delete />
        </IconButton>
      </div>
      <div className="ChipsDiv">{createMuiChips()}</div>
    </div>
  );
};

export default Person;
