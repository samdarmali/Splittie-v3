import React from "react"; //Component
// import { connect } from "react-redux";

import "./Items.css";
import NewItem from "./NewItem/NewItem";
import ItemList from "./ItemList/ItemList";
import Totals from "./Totals/Totals";
// import * as actions from "../../store/actions/index";
import Charges from "./Charges/Charges";

const Items = (props) => {
  return (
    <div className="Items">
      <NewItem addItem={props.addItem} />
      <ItemList
        itemObj={props.items}
        deleteItem={props.deleteItem}
        deleteAllShares={props.deleteAllShares}
      />
      <Charges
        service={props.service}
        gst={props.gst}
        updateCharge={props.updateCharge}
      />
      <Totals subTotal={props.subTotal} total={props.total} />
    </div>
  );
};

export default Items;

/* REDUX */
// const mapDispatchToProps = (dispatch) => {
//   return {
//     onNext: () => dispatch(actions.next()),
//   };
// };

// export default connect(null, mapDispatchToProps)(Items);
