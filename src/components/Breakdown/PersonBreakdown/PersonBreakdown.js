import React, { Component } from 'react'
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { List, ListItem, ListItemText, Collapse, Divider } from '@material-ui/core';

import classes from './PersonBreakdown.module.css';

class PersonBreakdown extends Component {
    state = {
        open: false
    }

    handleClick = () => {
        this.setState({ open: !this.state.open });
    };

    render() {
        const { id, personName, shares, subTotal, total } = this.props.personObj;

        let items = shares.map(el => {
            const itemPrimary = el.itemName + ' (' + el.fraction + ') ';
            return (
                <ListItem key={el.itemId} className={classes.Item}>
                    <ListItemText>
                        <span style={{ float: 'left' }}>{itemPrimary}</span>
                        <span style={{ float: 'right' }}>$ {el.sharePrice.toFixed(2)}</span>
                    </ListItemText>
                </ListItem >
            )
        })
        const max = Math.max(...shares.map(el => el.id));
        const serviceAndGst = total - subTotal;

        items.push(
            <ListItem key={max + 1} className={classes.Item} >
                <ListItemText>
                    <span style={{ float: 'left' }}>Service & GST</span>
                    <span style={{ float: 'right' }}>$ {serviceAndGst.toFixed(2)}</span>
                </ListItemText>
            </ListItem >);

        return (
            <>
                <ListItem button onClick={this.handleClick}>
                    <ListItemText key={id}>
                        <span style={{ float: 'left' }}>{personName}</span>
                        <span style={{ float: 'right' }}>$ {total.toFixed(2)}</span>
                    </ListItemText>
                    {this.state.open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding className={classes.ItemList}>
                        {items}
                    </List>
                </Collapse>
                <Divider />
            </>
        )
    }
}

export default PersonBreakdown;
