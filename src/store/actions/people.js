import * as actionTypes from './actionTypes';

export const addPerson = (personData) => {
    return {
        type: actionTypes.ADD_PERSON,
        personData: personData
    }
}

export const deletePerson = (id) => {
    return {
        type: actionTypes.DELETE_PERSON,
        id: id
    }
}

// Helper
export const getItemAttribute = (state, itemId, attrName) => {
    const itemIdIndex = state.bill.items.map(el => el.id).indexOf(itemId);
    return state.bill.items[itemIdIndex][attrName];
}

// Helper
export const getPersonSharesDetails = (state, personId) => {
    const personIdIndex = state.people.people.map(el => el.id).indexOf(personId);
    const personShares = state.people.people[personIdIndex].shares;
    const personSharesIdList = personShares.map(el => el.itemId);
    return {
        personIdIndex: personIdIndex,
        personShares: personShares,
        personSharesIdList: personSharesIdList
    };
}

export const addShare = (itemId, personId) => {
    // use thunk middleware to return a function which is only called when addShare is called in Person.js
    return (dispatch, getState) => {
        // use getState to access to bill state (this is not best practice)
        const state = getState();
        // get person shares details with helper function and destructuring
        const { personIdIndex, personShares, personSharesIdList } = getPersonSharesDetails(state, personId);
        // check if current itemId is in person's shares
        let share = {};
        let alreadyExists = false;
        let personShareIdIndex = null;
        // if already exists update share, else create new share
        if (personSharesIdList.includes(itemId)) {
            // console.log('Item already exists')
            personShareIdIndex = personSharesIdList.indexOf(itemId);
            share = {
                ...personShares[personShareIdIndex],
                quantity: personShares[personShareIdIndex].quantity + 1
            };
            alreadyExists = true;
        } else {
            // console.log('Item does not exists')
            share = {
                itemId: itemId,
                itemName: getItemAttribute(state, itemId, 'itemName'),
                itemPrice: getItemAttribute(state, itemId, 'itemPrice'),
                quantity: 1
            };
        }
        dispatch({
            type: actionTypes.ADD_SHARE,
            shareData: share,
            alreadyExists: alreadyExists,
            personIdIndex: personIdIndex,
            personShareIdIndex: personShareIdIndex
        })
    }
}

export const deleteShare = (itemId, personId) => {
    return (dispatch, getState) => {
        const state = getState();
        const { personIdIndex, personShares, personSharesIdList } = getPersonSharesDetails(state, personId);
        // check if last share in person's shares
        let share = {};
        let shouldDelete = false;
        const personShareIdIndex = personSharesIdList.indexOf(itemId);
        // if last share, delete share, else reduce quantity by 1
        if (personShares[personSharesIdList.indexOf(itemId)].quantity === 1) {
            shouldDelete = true;
        } else {
            share = {
                ...personShares[personShareIdIndex],
                quantity: personShares[personShareIdIndex].quantity - 1
            };
        }
        dispatch({
            type: actionTypes.DELETE_SHARE,
            shareData: share,
            shouldDelete: shouldDelete,
            personIdIndex: personIdIndex,
            personShareIdIndex: personShareIdIndex
        })
    }
}

export const updateTotalQuantity = () => {
    return (dispatch, getState) => {
        const state = getState();
        const bill = state.bill;
        dispatch({
            type: actionTypes.UPDATE_TOTAL_QTY,
            bill: bill
        })
    }
}

export const deleteAllShares = (itemId) => {
    return {
        type: actionTypes.DELETE_ALL_SHARES,
        id: itemId
    }
}
