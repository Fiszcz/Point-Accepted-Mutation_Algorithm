import {stepsReducer} from "../reducers/steps/stepsReducer";
import {createStore} from 'redux';

export function configureStore() {
    return createStore(stepsReducer);
}
