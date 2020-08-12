import React from 'react'
import { connect } from 'react-redux';

import classes from './Total.module.css'

const Total = (props) => {
    return (
        <div className={classes.Total} style={{marginBottom:'10px'}}>
            <div className={classes.TotalBox}>
                <p>Total</p>
                <p>$ {props.total}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        total: state.bill.total
    }
}

export default connect(mapStateToProps)(Total)
