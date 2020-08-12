import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';

import classes from './NewPerson.module.css';
import Input from '../../UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';

class NewPerson extends Component {
    state = {
        controls: {
            personName: {
                elementName: 'personName',
                elementConfig: {
                    type: 'text',
                    placeholder: 'E.g. Sam'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // update form element
        const updatedFormElement = updateObject(this.state.controls[inputIdentifier], {
            value: event.target.value,
            valid: checkValidity(event.target.value, this.state.controls[inputIdentifier].validation), // validate form element
            touched: true
        });
        // update whole form
        const updatedForm = updateObject(this.state.controls, { [inputIdentifier]: updatedFormElement });
        // validation
        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        // update form state
        this.setState({ controls: updatedForm, formIsValid: formIsValid });
    }

    personAddHandler = (event) => {
        event.preventDefault();
        const person = {
            personName: this.state.controls.personName.value
        };
        this.props.onAddPerson(person);
        // clear inputs and focus
        this.clearInputs();
    }

    clearInputs = () => {
        const newPersonName = updateObject(this.state.controls.personName, { value: '', valid: false });
        const newControls = updateObject(this.state.controls, { personName: newPersonName });
        this.setState({ controls: newControls, formIsValid: false });
    }

    render() {
        const form = (
            <form onSubmit={this.personAddHandler}>
                <Input
                    elementName={this.state.controls.personName.elementName}
                    elementConfig={this.state.controls.personName.elementConfig}
                    value={this.state.controls.personName.value}
                    changed={(event) => this.inputChangedHandler(event, this.state.controls.personName.elementName)} />
                <div>
                    <Button disabled={!this.state.formIsValid} variant="contained" type="submit">
                        ADD
                    </Button>
                </div>
            </form>
        );

        return (
            <>
                <h3>People</h3>
                <div className={classes.NewPerson}>
                    {form}
                </div>
            </>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPerson: (person) => dispatch(actions.addPerson(person))
    }
}

export default connect(null, mapDispatchToProps)(NewPerson);