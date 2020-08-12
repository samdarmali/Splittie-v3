import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import { NavigateNext } from '@material-ui/icons';

import classes from './Items.module.css';
import NewItem from './NewItem/NewItem';
import ItemList from './ItemList/ItemList';
import Totals from './Totals/Totals';
import * as actions from '../../store/actions/index';
import Charges from './Charges/Charges';

class Items extends Component {

    onNextHandler = () => {
        this.props.onNext()
    }

    render() {
        return (
            <div className={classes.Items}>
                <NewItem />
                <ItemList itemObj={this.props.items} />
                <Charges />
                <Totals />
                <div className={classes.ButtonDiv}>
                    <Button variant="contained" onClick={this.props.onNext}>
                        People<NavigateNext />
                    </Button>
                </div>
            </div>
        )
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onNext: () => dispatch(actions.next())
    }
}

export default connect(null, mapDispatchToProps)(Items);