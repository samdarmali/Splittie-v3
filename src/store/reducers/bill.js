import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    items: [],
    service: 10,
    gst: 7,
    subTotal: 0.00,
    total: 0.00
}

// Helper
const setNewId = (state, action) => {
    let newId = null;
    const idList = state.items.map(el => el.id);
    // set new id for item that does not already exist            
    for (let n in [...Array(state.items.length + 2).keys()]) {
        if (!idList.includes(parseInt(n)) && parseInt(n) !== 0) {
            newId = parseInt(n);
            break;
        }
    }
    return newId;
}

const addItem = (state, action) => {
    const newId = setNewId(state, action);
    const newPrice = parseFloat(action.itemData.itemPrice);
    const newItemData = updateObject(action.itemData, { 
        id: newId, 
        itemPrice: newPrice,
        totalQuantity: 0
    });
    return updateObject(state, { items: state.items.concat(newItemData) });
}

const deleteItem = (state, action) => {
    const idIndex = state.items.map(el => el.id).indexOf(action.id);
    let clonedItems = [...state.items];
    if (idIndex > -1) {
        clonedItems.splice(idIndex, 1);
    }
    return updateObject(state, { items: clonedItems });
}

const updateCharge = (state, action) => {
    return updateObject(state, { [action.chargeType]: action.value });
}

const updateSubTotal = (state, action) => {
    if (state.items.length >= 1) {
        const newTotal = state.items.map(el => el.itemPrice).reduce((prev, curr) => prev + curr)
        return updateObject(state, { subTotal: newTotal.toFixed(2) });
    } else {
        return updateObject(state, { subTotal: 0 });
    }
}

const updateTotal = (state, action) => {
    const subTotal = parseFloat(state.subTotal);
    const totalService = subTotal + ((state.service/100) * subTotal);
    const totalGst = totalService + ((state.gst/100) * totalService);
    return updateObject(state, { total: totalGst.toFixed(2) });
}

const updateShareItems = (state, action) => {
    const idIndex = state.items.map(el => el.id).indexOf(action.itemId);
    let clonedItems = [...state.items];
    if (action.updateParam === 'add') {
        clonedItems[idIndex] = updateObject(clonedItems[idIndex], { totalQuantity: clonedItems[idIndex].totalQuantity + 1 });
    } else {
        clonedItems[idIndex] = updateObject(clonedItems[idIndex], { totalQuantity: clonedItems[idIndex].totalQuantity - 1 });
    }
    return updateObject(state, { items: clonedItems });
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.ADD_ITEM): return addItem(state, action);
        case (actionTypes.DELETE_ITEM): return deleteItem(state, action);
        case (actionTypes.UPDATE_CHARGE): return updateCharge(state, action);
        case (actionTypes.UPDATE_SUB_TOTAL): return updateSubTotal(state, action);
        case (actionTypes.UPDATE_TOTAL): return updateTotal(state, action);
        case (actionTypes.UPDATE_SHARE_ITEMS): return updateShareItems(state, action);
        default: return state
    }
}

export default reducer;