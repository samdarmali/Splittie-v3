import React from 'react'

import classes from './Gst.module.css'
import Input from '../../UI/Input/Input'

const Gst = (props) => {
    return (
        <div className={classes.Gst}>
            <div className={classes.GstBox}>
                <p>GST:</p>
                <Input
                    elementName={props.elementName}
                    elementConfig={props.elementConfig}
                    value={props.value}
                    changed={props.changed} />
                <p>%</p>
            </div>
        </div>
    )
}

export default Gst

