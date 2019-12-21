import { sequencesReducer } from '../../../src/reducers/sequencesReducer';

describe('sequencesReducer', () => {
    test('should return the initial state', () => {
        expect(sequencesReducer(undefined, {} as any)).toEqual({ areComputed: false, sequences: [] });
    });

    test('should handle SET_SEQUENCES action', () => {
        expect(sequencesReducer({ areComputed: true, sequences: [] }, { sequences: ['AAA', 'BBB'], type: 'SET_SEQUENCES' })).toEqual({
            sequences: ['AAA', 'BBB'],
            areComputed: false,
        });
    });

    test('should handle SET_SEQUENCES_AS_COMPUTED action', () => {
        expect(sequencesReducer({ areComputed: false, sequences: ['AAA', 'BBB'] }, { type: 'SET_SEQUENCES_AS_COMPUTED' })).toEqual({
            sequences: ['AAA', 'BBB'],
            areComputed: true,
        });
    });
});
