import React from 'react'
import { connect } from 'react-redux';

import classes from './Total.module.css'

const SubTotal = (props) => {
    return (
        <div className={classes.Total}>
            <div className={classes.TotalBox}>
                <p>Sub-Total</p>
                <p>$ {props.subTotal}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        subTotal: state.bill.subTotal
    }
}

export default connect(mapStateToProps)(SubTotal)