import React from "react";
import { connect } from "react-redux";

import Items from "../../components/Items/Items";
import People from "../../components/People/People";
import Breakdown from "../../components/Breakdown/Breakdown";

// class NewBill extends Component {
//     render() {
//         switch (this.props.step) {
//             case 1: return <Items items={this.props.items} />
//             case 2: return <People people={this.props.people} />
//             case 3: return <Breakdown />
//             default: return null
//         }
//     }
// }

const NewBill = (props) => {
  switch (props.step) {
    case 1:
      return <Items items={props.items} />;
    case 2:
      return <People people={props.people} />;
    case 3:
      return <Breakdown />;
    default:
      return null;
  }
};

const mapStateToProps = (state) => {
  return {
    step: state.step.step,
    items: state.bill.items,
    people: state.people.people,
  };
};

export default connect(mapStateToProps)(NewBill);
