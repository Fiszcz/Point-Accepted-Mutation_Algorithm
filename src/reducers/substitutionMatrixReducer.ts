import {SubstitutionMatrixActions} from "../actions/substitutionMatrix/substitutionMatrix";
import {
    computeLambdaForPAM1,
    computeMatrixOneStepBeforePAM1,
    computePAM1,
    computeProbabilityOfSymbols,
    countAllSubstitutions,
    countLengthOfAllSequences,
    countOccurrencesOfSymbols,
    getDividedSubstitutionMatrixByOccurrences,
    getUniqueSymbols,
    mapPhylogeneticTreeToSubstitutionMatrix
} from "../model/substitutionMatrix";

interface SubstitutionMatrixState {
    substitutionMatrix: (number | '-')[][];
    uniqueListOfSymbols: string;
    lengthOfAllSequences: number;
    occurrencesNumberOfSymbols: number[];
    probabilitiesOfSymbols: number[];
    numberOfAllSubstitutions: number;
    matrixWithDividedValuesByOccurrences: (number | '-') [][];
    lambda: number;
    matrixOneStepBeforePAM1: number [][];
    PAM1Matrix: number[][];
}

const initialState: SubstitutionMatrixState = {
    substitutionMatrix: [],
    PAM1Matrix: [],
    matrixOneStepBeforePAM1: [],
    lambda: 0,
    numberOfAllSubstitutions: 0,
    matrixWithDividedValuesByOccurrences: [],
    probabilitiesOfSymbols: [],
    occurrencesNumberOfSymbols: [],
    uniqueListOfSymbols: '',
    lengthOfAllSequences: 0,
};

export const substitutionMatrixReduce = (state: SubstitutionMatrixState = initialState, action: SubstitutionMatrixActions): SubstitutionMatrixState => {
    if (action.type === "COMPUTE_SUBSTITUTION_MATRIX") {
        const uniqueListOfSymbols = getUniqueSymbols(action.sequences);
        const substitutionMatrix = mapPhylogeneticTreeToSubstitutionMatrix(action.phylogeneticTree, uniqueListOfSymbols);
        const lengthOfAllSequences = countLengthOfAllSequences(action.sequences);
        const occurrencesNumberOfSymbols = countOccurrencesOfSymbols(action.sequences, uniqueListOfSymbols);
        const probabilitiesOfSymbols = computeProbabilityOfSymbols(occurrencesNumberOfSymbols, lengthOfAllSequences);
        const matrixWithDividedValuesByOccurrences = getDividedSubstitutionMatrixByOccurrences(substitutionMatrix, occurrencesNumberOfSymbols);
        const numberOfAllSubstitutions = countAllSubstitutions(substitutionMatrix);
        const lambda = computeLambdaForPAM1(lengthOfAllSequences, numberOfAllSubstitutions);
        const matrixOneStepBeforePAM1 = computeMatrixOneStepBeforePAM1(matrixWithDividedValuesByOccurrences, lambda);
        const PAM1Matrix = computePAM1(matrixOneStepBeforePAM1, probabilitiesOfSymbols);
        return {substitutionMatrix,
            uniqueListOfSymbols,
            lengthOfAllSequences,
            occurrencesNumberOfSymbols,
            probabilitiesOfSymbols,
            matrixWithDividedValuesByOccurrences,
            numberOfAllSubstitutions,
            lambda,
            matrixOneStepBeforePAM1,
            PAM1Matrix,
        };
    } else {
        return state;
    }
};
