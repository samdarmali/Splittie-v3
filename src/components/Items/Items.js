import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";

import "./Items.css";
import NewItem from "./NewItem/NewItem";
import ItemList from "./ItemList/ItemList";
import Totals from "./Totals/Totals";
import * as actions from "../../store/actions/index";
import Charges from "./Charges/Charges";

const Items = (props) => {
    
  const onNextHandler = () => {
    // props.onNext();
    props.step += 1
  };

  return (
    <div className="Items">
      <NewItem />
      <ItemList itemObj={props.items} />
      <Charges />
      <Totals />
      {/* <div className="ButtonDiv">
        Button variant="contained" onClick={props.onNext}>
          People
          <NavigateNext />
        </Button>
      </div> */}
    </div>
  );
};

/* REDUX */
const mapDispatchToProps = (dispatch) => {
  return {
    onNext: () => dispatch(actions.next()),
  };
};

export default connect(null, mapDispatchToProps)(Items);