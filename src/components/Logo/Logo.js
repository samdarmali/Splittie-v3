import React from 'react';

import splittieLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={splittieLogo} alt="MyBurger" />
    </div>
); 

export default logo;