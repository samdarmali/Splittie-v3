import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List, Button, Modal, Fade, Backdrop } from '@material-ui/core';
import { NavigateNext, NavigateBefore } from '@material-ui/icons';

import classes from './Breakdown.module.css';
import * as actions from '../../store/actions/index';
import PersonBreakdown from './PersonBreakdown/PersonBreakdown';

class Breakdown extends Component {
    state = {
        isOpen: false,
        whatsappString: 'https://api.whatsapp.com/send?text=',
        teleToken: '1373978841:AAEk3fv24Wb1HJRuYXPGJvLows8s6bSyOJU',
        telegramString: 'https://api.telegram.org/bot',
        telegramString2: 'tg://msg?text='
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    handleOpen = () => {
        this.setState({ isOpen: true });

        // update whatsapp string 
        let WAString = this.state.whatsappString;
        const newline = '%0A';
        // loop through state and add
        this.props.people.forEach(person => {
            // add name to list
            const personName = person.personName;
            WAString = WAString + personName + newline;
            // add shares to list
            person.shares.forEach(share => {
                WAString = WAString + ' - ' + share.itemName + ' (' + share.fraction + ') ' + ' $' + share.sharePrice + newline;
            })
        })
        
        // update telegram string
        // let TELEString = this.state.telegramString + this.state.teleToken + '/sendMessage?text=';
        let TELEString = this.state.telegramString2;
        // loop through state and add
        this.props.people.forEach(person => {
            // add name to list
            const personName = person.personName;
            TELEString = TELEString + personName + newline;
        })
        this.setState({ whatsappString: WAString, telegramString2: TELEString });
    }



    render() {

        const personBreakdownArr = this.props.people.map(el => {
            return <PersonBreakdown key={el.id} personObj={el} />
        })

        return (
            <div className={classes.Breakdown}>
                <h3>Total: {this.props.total}</h3>
                <List className={classes.BreakdownList} style={{ marginBottom: '10px' }}>
                    {personBreakdownArr}
                </List>
                <div className={classes.ButtonDiv}>
                    <Button variant="contained" onClick={this.props.onPrev}>
                        <NavigateBefore />People
                    </Button>
                    <Button onClick={this.handleOpen} variant="contained">
                        Share<NavigateNext />
                    </Button>
                </div>
                <Modal
                    className={classes.modal}
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{ timeout: 500 }}
                >
                    <Fade in={this.state.isOpen}>
                        <div className={classes.Paper}>
                            <h3>Where would you like to share?</h3>
                            <Button href={this.state.whatsappString}>
                                Whatsapp
                            </Button>
                            <Button href={this.state.telegramString2}>
                                Telegram
                            </Button>
                        </div>
                    </Fade>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        people: state.people.people,
        subTotal: state.bill.subTotal,
        total: state.bill.total
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNext: () => dispatch(actions.next()),
        onPrev: () => dispatch(actions.previous())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Breakdown);