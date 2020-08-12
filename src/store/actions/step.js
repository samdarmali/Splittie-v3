import * as actionTypes from './actionTypes';

export const next = () => {
    return {type: actionTypes.NEXT}
}

export const previous = () => {
    return {type: actionTypes.PREVIOUS}
}