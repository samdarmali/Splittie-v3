import React from 'react'

import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';

const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}
            <div className={classes.Logo}>
                <Logo />
            </div>
            {/* <nav className={classes.DesktopOnly}>
                <NavigationItems isAuthenticated={props.isAuth} />
            </nav> */}
            <nav className={classes.DesktopOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar;
