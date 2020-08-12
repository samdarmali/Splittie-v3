import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    step: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case (actionTypes.NEXT): return updateObject(state, {step: state.step + 1})
        case (actionTypes.PREVIOUS): return updateObject(state, {step: state.step - 1})
        default: return state
    }
}

export default reducer;