import React, { useState, useRef } from "react"; //Component
// import { connect } from "react-redux";
import { Button } from "@material-ui/core";

import classes from "./NewItem.module.css";
import Input from "../../UI/Input/Input";
// import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

const NewItem = (props) => {
  const itemNameRef = useRef(null);
  const [controls, setControls] = useState({
    itemName: {
      elementName: "itemName",
      elementConfig: {
        type: "text",
        placeholder: "E.g. Chicken",
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    itemCost: {
      elementName: "itemCost",
      elementConfig: {
        type: "number",
        placeholder: "0.00",
        inputProps: {
          min: "0.00",
          step: "0.01",
        },
      },
      value: "",
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const inputChangedHandler = (event, inputId) => {
    // Update form element
    const updatedFormElement = updateObject(controls[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, controls[inputId].validation),
      touched: true,
    });
    // Update whole form
    const updatedForm = updateObject(controls, {
      [inputId]: updatedFormElement,
    });
    // Validation
    let isValid = true;
    for (let inputId in updatedForm) {
      isValid = updatedForm[inputId].valid && isValid;
    }
    // Update form state
    setControls(updatedForm);
    setFormIsValid(isValid);
    // this.setState({ controls: updatedForm, formIsValid: formIsValid });
  };

  const itemAddHandler = (event) => {
    event.preventDefault();
    const item = {
      itemName: controls.itemName.value,
      itemPrice: controls.itemCost.value,
    };
    /* HOOKS */
    props.addItem(item);
    /* --- */

    /* REDUX */
    // props.onAddItem(item);
    // props.onUpdateSubTotal();
    // props.onUpdateTotal();
    /* --- */

    // clear inputs and focus
    clearInputs();
    // focus
    itemNameRef.current.focus();
  };

  const clearInputs = () => {
    const newitemName = updateObject(controls.itemName, {
      value: "",
      valid: false,
    });
    const newitemCost = updateObject(controls.itemCost, {
      value: "",
      valid: false,
    });
    const newControls = updateObject(controls, {
      itemName: newitemName,
      itemCost: newitemCost,
    });
    setControls(newControls);
    setFormIsValid(false);
    // this.setState({ controls: newControls, formIsValid: false });
  };

  return (
    <>
      <h3>Items</h3>
      <div className={classes.NewItem}>
        <form onSubmit={itemAddHandler}>
          <Input
            refr={itemNameRef}
            disabled={false}
            elementName={controls.itemName.elementName}
            elementConfig={controls.itemName.elementConfig}
            value={controls.itemName.value}
            changed={(event) =>
              inputChangedHandler(event, controls.itemName.elementName)
            }
          />
          <Input
            elementName={controls.itemCost.elementName}
            elementConfig={controls.itemCost.elementConfig}
            value={controls.itemCost.value}
            changed={(event) =>
              inputChangedHandler(event, controls.itemCost.elementName)
            }
          />
          <div>
            <Button disabled={!formIsValid} variant="contained" type="submit">
              ADD
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewItem;

/*** OLD CODE BELOW ***/

// class NewItem extends Component {
//   constructor(props) {
//     super(props);
//     this.itemNameRef = React.createRef();
//   }

//   state = {
//     controls: {
//       itemName: {
//         elementName: "itemName",
//         elementConfig: {
//           type: "text",
//           placeholder: "E.g. Chicken",
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//       itemCost: {
//         elementName: "itemCost",
//         elementConfig: {
//           type: "number",
//           placeholder: "0.00",
//           inputProps: {
//             min: "0.00",
//             step: "0.01",
//           },
//         },
//         value: "",
//         validation: {
//           required: true,
//         },
//         valid: false,
//         touched: false,
//       },
//     },
//     formIsValid: false,
//   };

//   inputChangedHandler = (event, inputIdentifier) => {
//     // update form element
//     const updatedFormElement = updateObject(
//       this.state.controls[inputIdentifier],
//       {
//         value: event.target.value,
//         valid: checkValidity(
//           event.target.value,
//           this.state.controls[inputIdentifier].validation
//         ), // validate form element
//         touched: true,
//       }
//     );
//     // update whole form
//     const updatedForm = updateObject(this.state.controls, {
//       [inputIdentifier]: updatedFormElement,
//     });
//     // validation
//     let formIsValid = true;
//     for (let inputIdentifier in updatedForm) {
//       formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
//     }
//     // update form state
//     this.setState({ controls: updatedForm, formIsValid: formIsValid });
//   };

//   itemAddHandler = (event) => {
//     event.preventDefault();
//     const item = {
//       itemName: this.state.controls.itemName.value,
//       itemPrice: this.state.controls.itemCost.value,
//     };
//     // add item
//     this.props.onAddItem(item);
//     // update totals
//     this.props.onUpdateSubTotal();
//     this.props.onUpdateTotal();
//     // clear inputs and focus
//     this.clearInputs();
//     // focus
//     this.itemNameRef.current.focus();
//   };

//   clearInputs = () => {
//     const newitemName = updateObject(this.state.controls.itemName, {
//       value: "",
//       valid: false,
//     });
//     const newitemCost = updateObject(this.state.controls.itemCost, {
//       value: "",
//       valid: false,
//     });
//     const newControls = updateObject(this.state.controls, {
//       itemName: newitemName,
//       itemCost: newitemCost,
//     });
//     this.setState({ controls: newControls, formIsValid: false });
//   };

//   render() {
//     const form = (
//       <form onSubmit={this.itemAddHandler}>
//         <Input
//           refr={this.itemNameRef}
//           disabled={false}
//           elementName={this.state.controls.itemName.elementName}
//           elementConfig={this.state.controls.itemName.elementConfig}
//           value={this.state.controls.itemName.value}
//           changed={(event) =>
//             this.inputChangedHandler(
//               event,
//               this.state.controls.itemName.elementName
//             )
//           }
//         />
//         <Input
//           elementName={this.state.controls.itemCost.elementName}
//           elementConfig={this.state.controls.itemCost.elementConfig}
//           value={this.state.controls.itemCost.value}
//           changed={(event) =>
//             this.inputChangedHandler(
//               event,
//               this.state.controls.itemCost.elementName
//             )
//           }
//         />
//         <div>
//           <Button
//             disabled={!this.state.formIsValid}
//             variant="contained"
//             type="submit"
//           >
//             ADD
//           </Button>
//         </div>
//       </form>
//     );

//     return (
//       <>
//         <h3>Items</h3>
//         <div className={classes.NewItem}>{form}</div>
//       </>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAddItem: (itemData) => dispatch(actions.addItem(itemData)),
//     onUpdateSubTotal: () => dispatch(actions.updateSubTotal()),
//     onUpdateTotal: () => dispatch(actions.updateTotal()),
//   };
// };

// export default connect(null, mapDispatchToProps)(NewItem);
