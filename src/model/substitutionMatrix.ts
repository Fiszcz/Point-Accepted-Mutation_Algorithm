import {TreeData} from "../utils/graphs";

export function getUniqueSymbols(sequences: string[]) {
    return sequences.join('')
        .split('')
        .filter(function(symbol, index, allSymbols) { return allSymbols.indexOf(symbol) === index})
        .sort()
        .join('');
}

export function mapPhylogeneticTreeToSubstitutionMatrix(tree: TreeData, symbols: string): (number | '-') [][] {
    const matrix: (number | '-') [][] = [];
    for (let i = 0; i < symbols.length; i++) {
        matrix.push([]);
        for (let j = 0; j < symbols.length; j++) {
            if (j === i)
                matrix[i].push('-');
            else
                matrix[i].push(0);
        }
    }

    countSubstitutionsForSymbols(tree, matrix, symbols);

    return matrix;
}

function countSubstitutionsForSymbols(tree: TreeData, matrix: (number | '-')[][], symbols: string) {
    const currentSequence = tree.name;
    const childrenSequences = tree.children?.map((vertex) => vertex.name);

    childrenSequences?.forEach((childSequence) => {
        for (let i = 0; i < childSequence.length; i++) {
            if (childSequence[i] !== currentSequence[i]) {
                (matrix[symbols.indexOf(childSequence[i])][symbols.indexOf(currentSequence[i])] as number)++;
                (matrix[symbols.indexOf(currentSequence[i])][symbols.indexOf(childSequence[i])] as number)++;
            }
        }
    });

    tree.children?.forEach((vertex) => countSubstitutionsForSymbols(vertex, matrix, symbols));
}

export const countLengthOfAllSequences = (sequences: string[]): number => {
    return sequences.join('').length;
};

export const countOccurrencesOfSymbols = (sequences: string[], symbols: string): number[] => {
    const concatenationOfSequences = sequences.join('');

    const numberOfSymbols = [];
    for (let symbol of symbols) {
        numberOfSymbols.push((concatenationOfSequences.match(new RegExp(symbol, 'g')) || []).length);
    }

    return numberOfSymbols;
};

export const computeProbabilityOfSymbols = (numberOfSymbols: number[], numberOfAllSymbols: number) => {
    return [...numberOfSymbols].map((numberOfOccurrences) => numberOfOccurrences / numberOfAllSymbols);
};

export const getDividedSubstitutionMatrixByOccurrences = (matrix: (number | '-')[][], occurrencesOfSymbols: number[]) => {
    return matrix.map((row, indexOfSymbol) => {
        return row.map((cell) => {
            if (cell === '-')
                return cell;
            else
                return cell / occurrencesOfSymbols[indexOfSymbol];
        })
    })
};

export const countAllSubstitutions = (matrix: (number | '-') [][]) => {
    let counter = 0;
    for (let i = 1; i < matrix.length; i++) {
        for (let j = i - 1; j >= 0; j--) {
            const element = matrix[i][j];
            if (element !== '-')
                counter += element;
        }
    }

    return counter;
};

export const computeLambdaForPAM1 = (lengthOfAllSequences: number, numberOfAllSubstitutions: number) => {
    return 0.01 * lengthOfAllSequences / numberOfAllSubstitutions;
};

export const computeMatrixOneStepBeforePAM1 = (matrix: (number | '-')[][], lambda: number): number [][] => {
    return matrix.map((row, index) => {
        let sumOfNumericCells = 0;
        const copyOfRow = row.map((cell, index) => {
            if (cell !== '-') {
                sumOfNumericCells += cell * lambda;
                return cell * lambda;
            } else
                return cell;
        });
        copyOfRow[index] = 1 - sumOfNumericCells;
        return copyOfRow as (number []);
    });
};

export const computePAM1 = (matrixBeforeLog: (number)[][], probabilitiesOfSymbols: number[]) => {
    return matrixBeforeLog.map((row) => {
        return row.map((cell, indexOfSymbol) => {
            return Math.round(2 * Math.log2(cell / probabilitiesOfSymbols[indexOfSymbol]));
        });
    })
};
