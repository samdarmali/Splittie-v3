import React from 'react';

import splittieLogo from '../../assets/images/logo.png';
import './Logo.css';

const logo = (props) => (
    <div className="Logo" >
        <img src={splittieLogo} alt="MyBurger" />
    </div>
); 

export default logo;