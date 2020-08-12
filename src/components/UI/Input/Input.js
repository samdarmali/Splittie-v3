import React from 'react';
import { Input, InputAdornment } from '@material-ui/core';

import classes from './Input.module.css';

const InputField = (props) => {
    let inputElement = null;

    switch (props.elementName) {
        case ('itemName'):
            inputElement = <Input
                inputRef={props.refr}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                label='Item' 
                style={{width: '60%'}}/>
            break;
        case ('itemCost'):
            inputElement = <Input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed}
                startAdornment={< InputAdornment position="start" > $</InputAdornment >} 
                style={{width: '25%', float: 'right'}}/>
            break;
        case ('personName'):
            inputElement = <Input
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} 
                style={{width: '70%'}} />
            break;
        case ('service'):
            inputElement = (<div className={classes.Input}>
                <input
                    className={classes.service}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            </div>)
            break;
        case ('gst'):
            inputElement = (<div className={classes.Input}>
                <input
                    className={classes.gst}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            </div>)
            break;
        default:
            inputElement = null;
    }

    return (
        <>{inputElement}</>
    )
}

export default InputField;
