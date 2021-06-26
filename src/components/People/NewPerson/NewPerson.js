import React, { useState } from "react"; 
import { Button } from "@material-ui/core";

import "./NewPerson.css";
import Input from "../../UI/Input/Input";
import { updateObject, checkValidity } from "../../../shared/utility";

const NewPerson = (props) => {
  const [controls, setControls] = useState({
    personName: {
      elementName: "personName",
      elementConfig: {
        type: "text",
        placeholder: "E.g. Sam",
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
    // update form element
    const updatedFormElement = updateObject(controls[inputId], {
      value: event.target.value,
      valid: checkValidity(event.target.value, controls[inputId].validation),
      touched: true,
    });
    // update whole form
    const updatedForm = updateObject(controls, {
      [inputId]: updatedFormElement,
    });
    // validation
    let isValid = true;
    for (let inputId in updatedForm) {
      isValid = updatedForm[inputId].valid && isValid;
    }
    // update form state
    setControls(updatedForm);
    setFormIsValid(isValid);
    // this.setState({ controls: updatedForm, formIsValid: isValid });
  };

  const clearInputs = () => {
    const newPersonName = updateObject(controls.personName, {
      value: "",
      valid: false,
    });
    const newControls = updateObject(controls, {
      personName: newPersonName,
    });
    setControls(newControls);
    setFormIsValid(false);
    // this.setState({ controls: newControls, formIsValid: false });
  };

  const personAddHandler = (event) => {
    event.preventDefault();
    const person = {
      personName: controls.personName.value,
    };
    props.addPerson(person);
    // clear inputs and focus
    clearInputs();
  };

  return (
    <>
      <h3>People</h3>
      <div className="NewPerson">
        <form onSubmit={personAddHandler}>
          <Input
            elementName={controls.personName.elementName}
            elementConfig={controls.personName.elementConfig}
            value={controls.personName.value}
            changed={(event) =>
              inputChangedHandler(event, controls.personName.elementName)
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

export default NewPerson

/* OLD CODE */

// class NewPerson extends Component {
//   state = {
//     controls: {
//       personName: {
//         elementName: "personName",
//         elementConfig: {
//           type: "text",
//           placeholder: "E.g. Sam",
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

//   personAddHandler = (event) => {
//     event.preventDefault();
//     const person = {
//       personName: this.state.controls.personName.value,
//     };
//     props.onAddPerson(person);
//     // clear inputs and focus
//     this.clearInputs();
//   };

//   clearInputs = () => {
//     const newPersonName = updateObject(this.state.controls.personName, {
//       value: "",
//       valid: false,
//     });
//     const newControls = updateObject(this.state.controls, {
//       personName: newPersonName,
//     });
//     this.setState({ controls: newControls, formIsValid: false });
//   };

//   render() {
//     const form = (
//       <form onSubmit={this.personAddHandler}>
//         <Input
//           elementName={this.state.controls.personName.elementName}
//           elementConfig={this.state.controls.personName.elementConfig}
//           value={this.state.controls.personName.value}
//           changed={(event) =>
//             this.inputChangedHandler(
//               event,
//               this.state.controls.personName.elementName
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
//         <h3>People</h3>
//         <div className={classes.NewPerson}>{form}</div>
//       </>
//     );
//   }
// }

// const mapDispatchToProps = (dispatch) => {
//   return {
//     onAddPerson: (person) => dispatch(actions.addPerson(person)),
//   };
// };

// export default connect(null, mapDispatchToProps)(NewPerson);
