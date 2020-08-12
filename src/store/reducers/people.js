import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    people: []
}

// Helper
const setNewId = (state) => {
    let newId = null;
    const idList = state.people.map(el => el.id);
    // set new id for item that does not already exist            
    for (let n in [...Array(state.people.length + 2).keys()]) {
        if (!idList.includes(parseInt(n)) && parseInt(n) !== 0) {
            newId = parseInt(n);
            break;
        }
    }
    return newId;
}

const addPerson = (state, action) => {
    const name = action.personData.personName;
    // create new person id
    const newId = setNewId(state);
    // create new person
    const newPersonData = updateObject(action.itemData, {
        id: newId,
        personName: name,
        shares: []
    });
    // add new person data into state
    return updateObject(state, { people: state.people.concat(newPersonData) });
}

const deletePerson = (state, action) => {
    const idIndex = state.people.map(el => el.id).indexOf(action.id);
    let clonedPeople = [...state.people];
    if (idIndex > -1) {
        clonedPeople.splice(idIndex, 1);
    }
    return updateObject(state, { people: clonedPeople });
}

const addShare = (state, action) => {
    let newShares = [...state.people[action.personIdIndex].shares];
    if (action.alreadyExists) {
        // replace old share obj 
        newShares[action.personShareIdIndex] = action.shareData;
    } else {
        // add new share obj
        newShares.push(action.shareData);
    }
    // replace old person obj
    const newPerson = updateObject(state.people[action.personIdIndex], { shares: newShares });
    let clonedPeople = [...state.people];
    clonedPeople[action.personIdIndex] = newPerson;
    // update state
    return updateObject(state, { people: clonedPeople });
}

const deleteShare = (state, action) => {
    let newShares = [...state.people[action.personIdIndex].shares];
    if (action.shouldDelete) {
        newShares.splice(action.personShareIdIndex, 1);
    } else {
        // replace old share obj 
        newShares[action.personShareIdIndex] = action.shareData;
    }
    // replace old person obj
    const newPerson = updateObject(state.people[action.personIdIndex], { shares: newShares });
    let clonedPeople = [...state.people];
    clonedPeople[action.personIdIndex] = newPerson;
    // update state
    return updateObject(state, { people: clonedPeople });
}

// Helper
const updateTotal = (subTotal, service, gst) => {
    const floatTotal = parseFloat(subTotal);
    const totalService = floatTotal + ((service / 100) * floatTotal);
    const total = totalService + ((gst / 100) * totalService);
    return total;
}

const updateBreakdown = (state, action) => {
    const newPeople = state.people.map(person => {
        // update shares array with item price, total qty, fraction and decimal attributes
        const newShares = person.shares.map(share => {
            const idIndex = action.bill.items.map(el => el.id).indexOf(share.itemId);
            const itemPrice = action.bill.items[idIndex].itemPrice;
            const totalQuantity = action.bill.items[idIndex].totalQuantity;
            const fraction = share.quantity.toString() + '/' + totalQuantity.toString();
            return updateObject(share, {
                itemPrice: itemPrice,
                totalQuantity: totalQuantity,
                fraction: fraction,
                decimal: share.quantity / totalQuantity,
                sharePrice: (share.quantity / totalQuantity) * itemPrice
            })
        })
        // give person a total and sub-total
        const personSubTotal = newShares.map(el => el.sharePrice).reduce((a, b) => a + b, 0);
        const personTotal = updateTotal(personSubTotal, action.bill.service, action.bill.gst);
        // update person
        return updateObject(person, {
            shares: newShares,
            subTotal: personSubTotal,
            total: personTotal
        });
    })
    // update people
    return updateObject(state, { people: newPeople });
}

const deleteAllShares = (state, action) => {
    const newPeople = state.people.map(person => {
        if (person.shares.length > 0) {
            // find itemId index in shares array
            const idIndex = person.shares.map(el => el.itemId).indexOf(action.id);
            // delete share if exists
            if (idIndex > -1) {
                let newShares = [...person.shares];
                newShares.splice(idIndex, 1);
                const newPerson = updateObject(person, { shares: newShares });
                return newPerson;
            } else {
                return person;
            }
        } else {
            return person;
        }
    });
    // update people
    return updateObject(state, { people: newPeople });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_PERSON): return addPerson(state, action);
        case (actionTypes.DELETE_PERSON): return deletePerson(state, action);
        case (actionTypes.ADD_SHARE): return addShare(state, action);
        case (actionTypes.DELETE_SHARE): return deleteShare(state, action);
        case (actionTypes.UPDATE_TOTAL_QTY): return updateBreakdown(state, action);
        case (actionTypes.DELETE_ALL_SHARES): return deleteAllShares(state, action);
        default: return state
    }
}

export default reducer;