import * as actionTypes from './actionTypes';

export const addItem = (itemData) => {
    return {
        type: actionTypes.ADD_ITEM,
        itemData: itemData
    }
}

export const deleteItem = (id) => {
    return {
        type: actionTypes.DELETE_ITEM,
        id: id
    }
}

export const updateCharge = (chargeType, value) => {
    return {
        type: actionTypes.UPDATE_CHARGE,
        chargeType: chargeType,
        value: value
    }
}

export const updateSubTotal = () => {
    return {
        type: actionTypes.UPDATE_SUB_TOTAL
    }
}

export const updateTotal = () => {
    return {
        type: actionTypes.UPDATE_TOTAL
    }
}

export const updateShareItems = (itemId, updateParam) => {
    return {
        type: actionTypes.UPDATE_SHARE_ITEMS,
        itemId: itemId,
        updateParam: updateParam
    }
}

