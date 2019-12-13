export interface SetSequences {
    type: 'SET_SEQUENCES';
    sequences: string[];
}

export function setSequences(sequences: string[]): SetSequences {
    return {
        type: 'SET_SEQUENCES',
        sequences,
    };
}

export interface SetSequencesAsComputed {
    type: 'SET_SEQUENCES_AS_COMPUTED';
}

export function setSequencesAsComputed(): SetSequencesAsComputed {
    return {
        type: 'SET_SEQUENCES_AS_COMPUTED',
    };
}

export type SequenceActions = SetSequencesAsComputed | SetSequences;
