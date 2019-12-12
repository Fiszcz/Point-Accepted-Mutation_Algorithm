import * as React from 'react';
import { useEffect } from 'react';
import { css, cx } from 'emotion';
import { generateTreeDiagram } from './PhylogeneticTree';
import { Typography } from '../../components/Typography';
import { buildTreeDataFromGraph, createCompleteGraphFromSequences } from '../../utils/graphs';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../store';
import { primAlgorithm } from '../../utils/primAlgorithm';
import { JumpToNextStep } from '../../components/JumpToNextStep';
import { setTree } from '../../actions/tree/tree';
import { computeSubstitutionMatrix } from '../../actions/substitutionMatrix/substitutionMatrix';

export const PhylogeneticTree = () => {
    const sequences = useSelector((state: AppState) => state.sequences.sequences);
    const numberOfAllSubstitutions = useSelector((state: AppState) => state.substitutionMatrix.numberOfAllSubstitutions);
    const dispatch = useDispatch();

    useEffect(() => {
        const uppercaseSequences = sequences.map(sequence => sequence.toUpperCase());
        const graphFromSequences = createCompleteGraphFromSequences(uppercaseSequences);
        const minimumSpanningTree = primAlgorithm(uppercaseSequences.length, graphFromSequences);
        const treeData = buildTreeDataFromGraph(minimumSpanningTree, uppercaseSequences);
        dispatch(setTree(treeData));
        generateTreeDiagram(treeData);
        dispatch(computeSubstitutionMatrix(treeData, uppercaseSequences));
    }, [sequences, dispatch]);

    return (
        <div className={phylogeneticTreePageStyle}>
            <div className={phylogeneticTreePageStyle}>
                <Typography variant={'headTitle'}>Drzewo filogenetyczne</Typography>
                <br />
                <Typography>
                    Na podstawie sekwencji wejściowych następuje etap rekonstruowania drzewo filogenetycznego. Drzewo takie można
                    wykorzystać algorytm maksymalnej parsymonii.
                    <br />
                    <br />
                    Budowanie drzewa zgodnego z zasadą maksymalnej parsymonii polega na wyszukiwaniu wszystkich możliwych topologii drzew i
                    odtwarzaniu takich sekwencji przodków, które wymagałyby najmniejszej ilości zmian ewolucyjnych prowadzących do naszego
                    wejściowego zbioru sekwencji.
                </Typography>
                {numberOfAllSubstitutions && (
                    <>
                        <br />
                        <Typography weight={'bold'} size={20}>
                            Liczba wszystkich substytucji: {numberOfAllSubstitutions}
                        </Typography>
                    </>
                )}
            </div>

            <div className={cx(phylogeneticTreePageStyle, sizeOfPhylogeneticTree)}>
                <div id={'phylogeneticTree'} />
            </div>

            <div className={phylogeneticTreePageStyle}>
                <JumpToNextStep>Macierz podstawień</JumpToNextStep>
            </div>
        </div>
    );
};

const sizeOfPhylogeneticTree = css({
    width: 1150,
    height: 500,
});

const phylogeneticTreePageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
});
