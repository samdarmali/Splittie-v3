import React from "react";
import { List } from "@material-ui/core";

import classes from "./ItemList.module.css";
import Item from "../Item/Item";

const ItemList = (props) => {
  // Map item object into array of jsx elements
  let transformedItems = Object.keys(props.itemObj).map((igKey) => {
    const i = props.itemObj[igKey];
    return (
      <Item
        itemName={i.itemName}
        itemCost={i.itemPrice}
        key={i.id}
        id={i.id}
        deleteItem={props.deleteItem}
      />
    );
  });

  return <List className={classes.ItemList}>{transformedItems}</List>;
};

export default ItemList;
