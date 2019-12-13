import { SequenceActions } from '../actions/sequences/sequences';

interface SequencesState {
    sequences: string[];
    areComputed: boolean;
}

const initialState: SequencesState = {
    sequences: [],
    areComputed: false,
};

export function sequencesReducer(state = initialState, action: SequenceActions) {
    switch (action.type) {
        case 'SET_SEQUENCES':
            return { sequences: action.sequences, areComputed: false };
        case 'SET_SEQUENCES_AS_COMPUTED':
            return { ...state, areComputed: true };
        default:
            return state;
    }
}
