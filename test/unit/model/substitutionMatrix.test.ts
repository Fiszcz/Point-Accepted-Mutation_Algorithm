import {
    computeMatrixOneStepBeforePAM1,
    computePAM1,
    countAllSubstitutions,
    countOccurrencesOfSymbols,
    getDividedSubstitutionMatrixByOccurrences,
    getUniqueSymbols,
    mapPhylogeneticTreeToSubstitutionMatrix,
} from '../../../src/model/substitutionMatrix';
import { TreeData } from '../../../src/utils/graphs';

describe('substitutionMatrix', () => {
    describe('getUniqueSymbols', () => {
        test('should get all unique symbols from sequence and save them sorted to string', () => {
            const sequences = ['BBB', 'TPOL', 'MMNN', 'AAA'];

            expect(getUniqueSymbols(sequences)).toBe('ABLMNOPT');
        });
    });

    describe('mapPhylogeneticTreeToSubstitutionMatrix', () => {
        test('should create substitution matrix from phylogenetic tree data', () => {
            const phylogeneticTree: TreeData = {
                name: 'AAA',
                children: [
                    {
                        name: 'AAB',
                    },
                    {
                        name: 'AAC',
                        children: [
                            {
                                name: 'CCC',
                            },
                            {
                                name: 'ABC',
                            },
                        ],
                    },
                    {
                        name: 'AAD',
                    },
                ],
            };
            const symbols = 'ABCD';
            const expectedSubstitutionMatrix = [
                ['-', 2, 3, 1],
                [2, '-', 0, 0],
                [3, 0, '-', 0],
                [1, 0, 0, '-'],
            ];

            expect(mapPhylogeneticTreeToSubstitutionMatrix(phylogeneticTree, symbols)).toEqual(expectedSubstitutionMatrix);
        });
    });

    describe('countOccurrencesOfSymbols', () => {
        test('should count occurrences of each symbol in all sequences', () => {
            const symbols = 'ABCDE';
            const sequences = ['AAA', 'BAB', 'DDD', 'CDD', 'AEE'];
            const expectedOccurrencesOfSymbols = [5, 2, 1, 5, 2];

            expect(countOccurrencesOfSymbols(sequences, symbols)).toEqual(expectedOccurrencesOfSymbols);
        });
    });

    describe('getDividedSubstitutionMatrixByOccurrences', () => {
        test('should divide all cells of matrix by specific number of occurrences', () => {
            const matrix: ('-' | number)[][] = [
                ['-', 2, 3, 1],
                [2, '-', 0, 0],
                [3, 0, '-', 0],
                [1, 0, 0, '-'],
            ];
            const occurrencesOfSymbols = [10, 4, 5, 2];
            const expectedMatrixAfterDividingOperations: ('-' | number)[][] = [
                ['-', 0.2, 0.3, 0.1],
                [0.5, '-', 0, 0],
                [0.6, 0, '-', 0],
                [0.5, 0, 0, '-'],
            ];

            expect(getDividedSubstitutionMatrixByOccurrences(matrix, occurrencesOfSymbols)).toEqual(expectedMatrixAfterDividingOperations);
        });
    });

    describe('countAllSubstitutions', () => {
        test('count number of substitutions from substitution matrix', () => {
            const matrix: ('-' | number)[][] = [
                ['-', 2, 3, 1],
                [2, '-', 0, 0],
                [3, 0, '-', 0],
                [1, 0, 0, '-'],
            ];
            const expectedNumberOfSubstitutions = 6;

            expect(countAllSubstitutions(matrix)).toBe(expectedNumberOfSubstitutions);
        });
    });

    describe('computeMatrixOneStepBeforePAM1', () => {
        test('get matrix which is multiplied by lambda value', () => {
            const lambdaValue = 0.05;
            const matrix: ('-' | number)[][] = [
                ['-', 2, 3, 1],
                [2, '-', 0, 0],
                [3, 0, '-', 0],
                [1, 0, 0, '-'],
            ];
            const expectedMatrixAfterMultiplications: ('-' | number)[][] = [
                [0.7, 0.1, 0.15000000000000002, 0.05],
                [0.1, 0.9, 0, 0],
                [0.15000000000000002, 0, 0.85, 0],
                [0.05, 0, 0, 0.95],
            ];

            expect(computeMatrixOneStepBeforePAM1(matrix, lambdaValue)).toEqual(expectedMatrixAfterMultiplications);
        });
    });

    describe('computePAM1', () => {
        test('compute PAM1 for specific normalized by lambda value matrix', () => {
            const matrix = [
                [0.7, 0.1, 0.15, 0.05],
                [0.1, 0.9, 0, 0],
                [0.15, 0, 0.85, 0],
                [0.05, 0, 0, 0.95],
            ];
            const probabilitiesOfSymbols = [0.5, 0.2, 0.25, 0.05];
            const expectedPAMMatrix: number[][] = [
                [1, -2, -1, 0],
                [-5, 4, -Infinity, -Infinity],
                [-3, -Infinity, 4, -Infinity],
                [-7, -Infinity, -Infinity, 8],
            ];

            expect(computePAM1(matrix, probabilitiesOfSymbols)).toEqual(expectedPAMMatrix);
        });
    });
});
