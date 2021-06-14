import React from "react";
import { List } from "@material-ui/core";

import classes from "./PersonList.module.css";
import Person from "../Person/Person";

const PersonList = (props) => {
  // Map item object into array of jsx elements
  let transformedPersons = Object.keys(props.people).map((igKey) => {
    const i = props.people[igKey];
    return (
      <Person
        people={props.people}
        items={props.items}
        personName={i.personName}
        key={i.id}
        id={i.id}
        updateShareItems={props.updateShareItems}
        addShare={props.addShare}
        deleteShare={props.deleteShare}
        deletePerson={props.deletePerson}
      />
    );
  });

  return (
    <List className={classes.PersonList} style={{ marginBottom: "10px" }}>
      {transformedPersons}
    </List>
  );
};

export default PersonList;
