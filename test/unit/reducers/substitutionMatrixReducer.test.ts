import { substitutionMatrixReduce } from '../../../src/reducers/substitutionMatrixReducer';
import { TreeData } from '../../../src/utils/graphs';

describe('substitutionMatrixReducer', () => {
    test('should compute all steps for and after creating substitution matrix', () => {
        const sequences = ['CCAAABAC', 'CCAABBAB', 'BBCACBAB', 'CBCACBAB', 'CCCABBAB', 'CCCBBBAB'];
        const phylogeneticTree: TreeData = {
            name: 'CCAABBAB',
            children: [
                {
                    name: 'CCAAABAC',
                },
                {
                    name: 'CCCABBAB',
                    children: [
                        {
                            name: 'CCCBBBAB',
                        },
                        {
                            name: 'CBCACBAB',
                            children: [
                                {
                                    name: 'BBCACBAB',
                                },
                            ],
                        },
                    ],
                },
            ],
        };
        expect(substitutionMatrixReduce(undefined, { type: 'COMPUTE_SUBSTITUTION_MATRIX', sequences, phylogeneticTree })).toEqual({
            PAM1Matrix: [
                [4, -13, -14],
                [-13, 3, -11],
                [-14, -11, 3],
            ],
            lambda: 0.03428571428571429,
            lengthOfAllSequences: 48,
            matrixOneStepBeforePAM1: [
                [0.9926530612244898, 0.004897959183673469, 0.0024489795918367346],
                [0.0038095238095238095, 0.9885714285714285, 0.007619047619047619],
                [0.002142857142857143, 0.008571428571428572, 0.9892857142857143],
            ],
            matrixWithDividedValuesByOccurrences: [
                ['-', 0.14285714285714285, 0.07142857142857142],
                [0.1111111111111111, '-', 0.2222222222222222],
                [0.0625, 0.25, '-'],
            ],
            numberOfAllSubstitutions: 7,
            occurrencesNumberOfSymbols: [14, 18, 16],
            probabilitiesOfSymbols: [0.2916666666666667, 0.375, 0.3333333333333333],
            substitutionMatrix: [
                ['-', 2, 1],
                [2, '-', 4],
                [1, 4, '-'],
            ],
            uniqueListOfSymbols: 'ABC',
        });
    });
});
