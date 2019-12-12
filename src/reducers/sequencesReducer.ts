import { SetSequences } from '../actions/sequences/sequences';
import { getUniqueSymbols } from '../model/substitutionMatrix';

interface SequencesState {
    sequences: string[];
    uniqueSymbols: string;
}

const initialState: SequencesState = {
    sequences: [],
    uniqueSymbols: '',
};

export function sequencesReducer(state = initialState, action: SetSequences) {
    if (action.type === 'SET_SEQUENCES') return { sequences: action.sequences, uniqueSymbols: getUniqueSymbols(action.sequences) };
    return state;
}
