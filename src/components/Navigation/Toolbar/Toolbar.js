import React from 'react'

import './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => {
    return (
        <header className="Toolbar">
            {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
                <Logo />
            {/* <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav> */}
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar;
