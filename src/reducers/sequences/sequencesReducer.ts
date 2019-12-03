import {SetSequences} from "../../actions/sequences/sequences";

const initialState  = {
    sequences: [],
};

export function sequencesReducer(state: {sequences: string[]} = initialState, action: SetSequences) {
    if (action.sequences)
        return {sequences: action.sequences};
    return state;
};
