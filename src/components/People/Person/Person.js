import React, { useState, useRef } from "react"; //Component, useEffect
// import { connect } from "react-redux";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import classes from "./Person.module.css";
// import * as actions from "../../../store/actions/index";

const Person = (props) => {
  const [value, setValue] = useState("");
  const menuItemRef = useRef(null);
  //   const [personShares, setPersonShares] = useState(null);
  //   const [menuItems, setMenuItems] = useState(null);

  const handleAdd = (itemId, personId) => {
    setValue(itemId);
    props.updateShareItems(itemId, "add");
    props.addShare(itemId, personId);
    // REDUX
    // this.setState({ value: itemId });
    // this.props.onUpdateShareItems(itemId, "add");
    // this.props.onAddShare(itemId, personId);
  };

  const handleDelete = (itemId, personId) => {
    props.updateShareItems(itemId, "delete");
    props.deleteShare(itemId, personId)
    // REDUX
    // this.props.onUpdateShareItems(itemId, "delete");
    // this.props.onDeleteShare(itemId, personId);
  };

  // Map item object into array of jsx elements
  const createMenuItems = () => {
    const transformedItems = Object.keys(props.items).map((igKey) => {
      // const transformedItems = menuItems.map((igKey) => {
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
      // const transformedShares = personShares.map((el) => {
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

  //   useEffect(() => {
  //     const personIndex = props.people.map((el) => el.id).indexOf(props.id);
  //     // console.log(personIndex);
  //     // console.log(props.people);
  //     // if (props.people[personIndex].shares) {
  //     // if (personIndex !== -1) {
  //     setPersonShares(props.people[personIndex].shares);
  //     // }
  //   }, [props.people, props.id]);

  //   useEffect(() => {
  //     const transformedItems = Object.keys(props.items);
  //     // console.log(transformedItems);
  //     // if (props.people[personIndex].shares) {
  //     if (transformedItems.length !== 0) {
  //       setMenuItems(transformedItems);
  //     }
  //   }, [props.items]);

  return (
    <div className={classes.PersonWrapper}>
      <div className={classes.Person} key={props.id} id={props.id}>
        <div className={classes.PersonBox}>
          <p>{props.personName}</p>
          <FormControl className={classes.ItemBox}>
            <InputLabel className={classes.InputLabel}>Select Item</InputLabel>
            <Select className={classes.Selector} value={value}>
              {/* {menuItems ? createMenuItems() : null} */}
              {createMenuItems()}
            </Select>
          </FormControl>
        </div>
        <IconButton edge="end" onClick={() => props.onDeletePerson(props.id)}>
          <Delete />
        </IconButton>
      </div>
      <div className={classes.ChipsDiv}>
        {/* {personShares ? createMuiChips() : null} */}
        {createMuiChips()}
      </div>
    </div>
  );
};

export default Person;

/* OLD CODE */

// class Person extends Component {
//   state = { value: "" };
//   // wrapper = React.createRef(); // STILL AN ISSUE

//   handleAdd = (itemId, personId) => {
//     this.setState({ value: itemId });
//     this.props.onUpdateShareItems(itemId, "add");
//     this.props.onAddShare(itemId, personId);
//   };

//   handleDelete = (itemId, personId) => {
//     this.props.onUpdateShareItems(itemId, "delete");
//     this.props.onDeleteShare(itemId, personId);
//   };

//   render() {
//     // Map item object into array of jsx elements
//     const transformedItems = Object.keys(this.props.items).map((igKey) => {
//       const i = this.props.items[igKey];
//       return (
//         <MenuItem
//           key={i.id}
//           id={i.id}
//           value={i.id}
//           onClick={() => this.handleAdd(i.id, this.props.id)}
//         >
//           {i.itemName}
//         </MenuItem>
//       );
//     });

//     // Create array of MUI Chips
//     const personIndex = this.props.people
//       .map((el) => el.id)
//       .indexOf(this.props.id);
//     const transformedShares = this.props.people[personIndex].shares.map(
//       (el) => {
//         const label = el.itemName + " x " + el.quantity;
//         return (
//           <Chip
//             style={{ margin: "2px" }}
//             key={el.itemId}
//             label={label}
//             onClick={() => this.handleAdd(el.itemId, this.props.id)}
//             onDelete={() => this.handleDelete(el.itemId, this.props.id)}
//           />
//         );
//       }
//     );

//     return (
//       <div className={classes.PersonWrapper}>
//         <div className={classes.Person} key={this.props.key} id={this.props.id}>
//           <div className={classes.PersonBox}>
//             <p>{this.props.personName}</p>
//             <FormControl className={classes.ItemBox}>
//               <InputLabel className={classes.InputLabel}>
//                 Select Item
//               </InputLabel>
//               <Select className={classes.Selector} value={this.state.value}>
//                 {transformedItems}
//               </Select>
//             </FormControl>
//           </div>
//           <IconButton
//             edge="end"
//             onClick={() => this.props.onDeletePerson(this.props.id)}
//           >
//             <Delete />
//           </IconButton>
//         </div>
//         <div className={classes.ChipsDiv}>{transformedShares}</div>
//       </div>
//     );
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     items: state.bill.items,
//     people: state.people.people,
//   };
// };

// const mapDispatchToConst = (dispatch) => {
//   return {
//     onDeletePerson: (id) => dispatch(actions.deletePerson(id)),
//     onAddShare: (itemId, personId) =>
//       dispatch(actions.addShare(itemId, personId)),
//     onDeleteShare: (itemId, personId) =>
//       dispatch(actions.deleteShare(itemId, personId)),
//     onUpdateShareItems: (itemId, updateParam) =>
//       dispatch(actions.updateShareItems(itemId, updateParam)),
//   };
// };

// export default connect(mapStateToProps, mapDispatchToConst)(Person);
