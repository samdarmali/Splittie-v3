import React from "react"; 

import "./People.css";
import NewPerson from "./NewPerson/NewPerson";
import PersonList from "./PersonList/PersonList";

const People = (props) => {
  return (
    <div className="People">
      <NewPerson addPerson={props.addPerson} />
      <PersonList
        people={props.people}
        items={props.items}
        updateShareItems={props.updateShareItems}
        addShare={props.addShare}
        deleteShare={props.deleteShare}
        deletePerson={props.deletePerson}
      />
    </div>
  );
};

export default People;