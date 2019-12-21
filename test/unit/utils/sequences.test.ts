import { countSubstitutionsBetweenSequences, generateRandomSequences } from '../../../src/utils/sequences';

describe('sequences', () => {
    describe('countSubstitutionsBetweenSequences', () => {
        test.each([
            ['A', 'A', 0],
            ['A', 'B', 1],
            ['AA', 'AB', 1],
            ['', '', 0],
            ['ABCDE', 'AXXXE', 3],
        ] as Array<[string, string, number]>)(
            'should properly count number of differences between entry sequences',
            (firstSequence, secondSequence, numberOfSubstitutions) => {
                expect(countSubstitutionsBetweenSequences(firstSequence, secondSequence)).toBe(numberOfSubstitutions);
            },
        );
    });

    describe('generateRandomSequences', () => {
        test.each([
            [0, 6],
            [0.999, 10],
        ])('should return from 6 to 10 of random sequences', (mathRandomValue, numberOfSequences) => {
            jest.spyOn(Math, 'random').mockReturnValueOnce(mathRandomValue);

            expect(generateRandomSequences()).toHaveLength(numberOfSequences);
        });

        test.each([
            [0, 6],
            [0.999, 13],
        ])('should return sequences with random length in some range', (mathRandomValue, lengthOfSequences) => {
            jest.spyOn(Math, 'random')
                .mockReturnValueOnce(0)
                .mockReturnValueOnce(mathRandomValue);

            const randomSequences = generateRandomSequences();
            for (let sequence of randomSequences) expect(sequence).toHaveLength(lengthOfSequences);
        });
    });
});
