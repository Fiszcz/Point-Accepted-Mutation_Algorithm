export interface SetSequences {
    type: 'SET_SEQUENCES';
    sequences: string[];
}

export function setSequences(sequences: string[]) {
    return {
        type: 'SET_SEQUENCES',
        sequences,
    };
}
