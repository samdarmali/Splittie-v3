import React, { Component } from 'react'
import { connect } from 'react-redux'

import Service from './Service'
import Gst from './Gst'
import * as actions from '../../../store/actions/index'

export class Charges extends Component {
    state = {
        controls: {
            service: {
                elementName: 'service',
                elementConfig: {
                    type: 'number',
                    placeholder: '0',
                    min: '0',
                    step: '1'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            gst: {
                elementName: 'gst',
                elementConfig: {
                    type: 'number',
                    placeholder: '0',
                    min: '0',
                    step: '1'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount() {
        // Pre-fill service and gst
        const updatedService = {
            ...this.state.controls.service,
            value: this.props.service
        };
        const updatedGst = {
            ...this.state.controls.gst,
            value: this.props.gst
        };
        const updatedForm = {
            ...this.state.controls,
            service: updatedService,
            gst: updatedGst
        }
        this.setState({ controls: updatedForm });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        // update form element
        const updatedFormElement = {
            ...this.state.controls[inputIdentifier],
            value: event.target.value
        };
        // update whole form
        const updatedForm = {
            ...this.state.controls,
            [inputIdentifier]: updatedFormElement
        }
        // update form state
        this.setState({ controls: updatedForm });
        // update store state
        this.props.onUpdateCharge(inputIdentifier, event.target.value);
        this.props.onUpdateSubTotal();
        this.props.onUpdateTotal();
    }

    render() {
        return (
            <div>
                <Service
                    elementName={this.state.controls.service.elementName}
                    elementConfig={this.state.controls.service.elementConfig}
                    value={this.state.controls.service.value}
                    changed={(event) => this.inputChangedHandler(event, this.state.controls.service.elementName)} />
                <Gst
                    elementName={this.state.controls.gst.elementName}
                    elementConfig={this.state.controls.gst.elementConfig}
                    value={this.state.controls.gst.value}
                    changed={(event) => this.inputChangedHandler(event, this.state.controls.gst.elementName)} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        service: state.bill.service,
        gst: state.bill.gst
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onUpdateCharge: (inputIdentifier, value) => dispatch(actions.updateCharge(inputIdentifier, value)),
        onUpdateSubTotal: () => dispatch(actions.updateSubTotal()),
        onUpdateTotal: () => dispatch(actions.updateTotal())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Charges)
