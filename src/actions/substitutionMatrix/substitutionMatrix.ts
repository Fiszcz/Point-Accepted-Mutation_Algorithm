import { TreeData } from '../../utils/graphs';

interface ComputeSubstitutionMatrix {
    type: 'COMPUTE_SUBSTITUTION_MATRIX';
    phylogeneticTree: TreeData;
    sequences: string[];
}

export type SubstitutionMatrixActions = ComputeSubstitutionMatrix;

export const computeSubstitutionMatrix = (phylogeneticTree: TreeData, sequences: string[]): ComputeSubstitutionMatrix => {
    return {
        type: 'COMPUTE_SUBSTITUTION_MATRIX',
        phylogeneticTree,
        sequences,
    };
};
