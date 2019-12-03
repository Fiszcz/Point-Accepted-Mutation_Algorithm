import {stepsReducer} from "../reducers/steps/stepsReducer";
import {createStore, combineReducers} from 'redux';
import {sequencesReducer} from "../reducers/sequences/sequencesReducer";

const rootReducer = combineReducers({
    steps: stepsReducer,
    sequences: sequencesReducer
});

export function configureStore() {
    return createStore(rootReducer);
}

export type AppState = ReturnType<typeof rootReducer>
