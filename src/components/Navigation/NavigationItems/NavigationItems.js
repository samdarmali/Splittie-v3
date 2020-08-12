import React from 'react'

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const NavigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">New Bill</NavigationItem>
        {/* <NavigationItem link="/pastbills">Past Bills</NavigationItem>
        <NavigationItem link="/login">Log In</NavigationItem> */}
    </ul>
)

export default NavigationItems;