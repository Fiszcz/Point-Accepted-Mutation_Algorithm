import { percentageToColor } from '../../../src/utils/color';

describe('percentageToColor', () => {
    test.each([
        [0, '#ff0000'],
        [25, '#ff7f00'],
        [50, '#ffff00'],
        [75, '#80ff00'],
        [100, '#00ff00'],
    ] as Array<[number, string]>)('should properly return hex color for specific percentage', (percentage, hexColor) => {
        expect(percentageToColor(percentage)).toBe(hexColor);
    });
});
