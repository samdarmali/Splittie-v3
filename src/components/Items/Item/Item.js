import React from "react";
import { connect } from "react-redux";
import { ListItem, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import classes from "./Item.module.css";
import * as actions from "../../../store/actions/index";

const Item = (props) => {
  const itemDeleteHandler = (event, id) => {
    event.preventDefault();

    /* HOOKS */
    props.deleteItem(id);
    props.deleteAllShares(id);
    /* --- */

    /* REDUX */
    props.onDeleteItem(id); //done
    props.onUpdateSubTotal(); //done
    props.onUpdateTotal(); //done
    props.onDeleteAllShares(id); // delete shares from people state
    /* --- */
  };

  return (
    <ListItem className={classes.Item} key={props.key} id={props.key}>
      <div className={classes.ItemBox}>
        <p>{props.itemName}</p>
        <p>$ {props.itemCost.toFixed(2)}</p>
      </div>
      <IconButton edge="end" onClick={(e) => itemDeleteHandler(e, props.id)}>
        <Delete />
      </IconButton>
    </ListItem>
  );
};

const mapDispatchToConst = (dispatch) => {
  return {
    onDeleteItem: (id) => dispatch(actions.deleteItem(id)),
    onUpdateSubTotal: () => dispatch(actions.updateSubTotal()),
    onUpdateTotal: () => dispatch(actions.updateTotal()),
    onDeleteAllShares: (id) => dispatch(actions.deleteAllShares(id)),
  };
};

export default connect(null, mapDispatchToConst)(Item);
