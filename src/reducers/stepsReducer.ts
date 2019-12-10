import {PAMSteps, StepsActions} from "../actions/steps/steps";

const initialState = {
    step: PAMSteps.WSTEP,
};

export function stepsReducer(state = initialState, action: StepsActions) {
    switch (action.type) {
        case "GO_TO":
            return {
                step: action.step,
            };
        case "GO_TO_NEXT_STEP":
            return {
                step: state.step + 1,
            };
        default:
            return state;
    }
}
