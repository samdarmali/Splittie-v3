import React, {  } from "react"; //Component
import { connect } from "react-redux";
// import { Button } from '@material-ui/core';
// import { NavigateNext, NavigateBefore } from '@material-ui/icons';

import classes from "./People.module.css";
import NewPerson from "./NewPerson/NewPerson";
import PersonList from "./PersonList/PersonList";
import * as actions from "../../store/actions/index";

const People = (props) => {
  return (
    <div className={classes.People}>
      <NewPerson addPerson={props.addPerson} />
      <PersonList
        people={props.people}
        items={props.items}
        updateShareItems={props.updateShareItems}
        addShare={props.addShare}
        deleteShare={props.deleteShare}
        deletePerson={props.deletePerson}
      />
    </div>
  );
};

export default People

// class People extends Component {
//   handleConfirm = () => {
//     // Update share totalQuantity
//     this.props.onUpdateTotalQuantity();
//     this.props.onNext();
//   };

//   render() {
//     return (
//       <div className={classes.People}>
//         <NewPerson />
//         <PersonList peopleObj={this.props.people} />
//         {/* <div className={classes.ButtonDiv}>
//                     <Button variant="contained" onClick={this.props.onPrev}>
//                         <NavigateBefore />Items
//                     </Button>
//                     <Button variant="contained" onClick={() => this.handleConfirm()}>
//                         Confirm<NavigateNext />
//                     </Button>
//                 </div> */}
//       </div>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onNext: () => dispatch(actions.next()),
//     onPrev: () => dispatch(actions.previous()),
//     onUpdateTotalQuantity: () => dispatch(actions.updateTotalQuantity()),
//   };
// };

// export default connect(null, mapDispatchToProps)(People);
