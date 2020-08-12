import React from 'react';
import { List } from '@material-ui/core';

import classes from './PersonList.module.css';
import Person from '../Person/Person';

const PersonList = (props) => {

    // Map item object into array of jsx elements
    let transformedPersons = Object.keys(props.peopleObj)
        .map(igKey => {
            const i = props.peopleObj[igKey];
            return <Person personName={i.personName} key={i.id} id={i.id} />
        });

    return (
        <List className={classes.PersonList} style={{marginBottom:'10px'}}>
            {transformedPersons}
        </List>
    );
}

export default PersonList;