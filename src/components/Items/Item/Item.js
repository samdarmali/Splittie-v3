import React from "react";
import { ListItem, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import "./Item.css";

const Item = (props) => {
  const itemDeleteHandler = (event, id) => {
    event.preventDefault();

    props.deleteItem(id);
    props.deleteAllShares(id);
  };

  return (
    <ListItem className="Item" key={props.key} id={props.key}>
      <div className="ItemBox">
        <p>{props.itemName}</p>
        <p>$ {props.itemCost.toFixed(2)}</p>
      </div>
      <IconButton edge="end" onClick={(e) => itemDeleteHandler(e, props.id)}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};

export default Item
