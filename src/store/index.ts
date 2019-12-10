import {createStore, combineReducers} from 'redux';
import {stepsReducer} from "../reducers/stepsReducer";
import {sequencesReducer} from "../reducers/sequencesReducer";
import {treeReducer} from "../reducers/treeReducer";
import {substitutionMatrixReduce} from "../reducers/substitutionMatrixReducer";

const rootReducer = combineReducers({
    steps: stepsReducer,
    sequences: sequencesReducer,
    tree: treeReducer,
    substitutionMatrix: substitutionMatrixReduce,
});

export function configureStore() {
    return createStore(rootReducer);
}

export type AppState = ReturnType<typeof rootReducer>
