import {SetTree} from "../actions/tree/tree";

const initialState = {
    tree: {name: ''},
};

export function treeReducer(state = initialState, action: SetTree) {
    if (action.tree) {
        return {tree: action.tree};
    }
    return state;
}
