import * as React from 'react';
import {useEffect} from 'react';
import {css, cx} from "emotion";
import {generateTreeDiagram} from "./PhylogeneticTree";
import {Typography} from "../../components/Typography";
import {buildTreeDataFromGraph, createCompleteGraphFromSequences} from "../../utils/graphs";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {primAlgorithm} from "../../utils/primAlgorithm";
import {JumpToNextStep} from "../../components/JumpToNextStep";

export const PhylogeneticTree = () => {
    const sequences = useSelector((state: AppState) => state.sequences.sequences);
    useEffect(() => {
        const graphFromSequences = createCompleteGraphFromSequences(sequences);
        const minimumSpanningTree = primAlgorithm(sequences.length, graphFromSequences);
        const treeData = buildTreeDataFromGraph(minimumSpanningTree, sequences);
        generateTreeDiagram(treeData)
    }, [sequences]);

    return <div className={phylogeneticTreePageStyle}>
        <div className={phylogeneticTreePageStyle}>
            <Typography variant={"headTitle"}>
                Drzewo filogenetyczne
            </Typography>
            <br/>
            <Typography>
                Na podstawie sekwencji wejściowych następuje etap rekonstruowania drzewo filogenetycznego. Drzewo takie
                można wykorzystać algorytm maksymalnej parsymonii.
                <br/>
                <br/>
                Budowanie drzewa zgodnego z zasadą maksymalnej parsymonii polega na wyszukiwaniu wszystkich możliwych
                topologii drzew i odtwarzaniu takich sekwencji przodków, które wymagałyby najmniejszej ilości zmian
                ewolucyjnych prowadzących do naszego wejściowego zbioru sekwencji.
            </Typography>
        </div>

        <div className={cx(phylogeneticTreePageStyle, css({width: 900, height: 500}))}>
            <div id={'phylogeneticTree'}/>
        </div>

        <div className={phylogeneticTreePageStyle}>
            <JumpToNextStep>Macierz podstawień</JumpToNextStep>
        </div>
    </div>
};

const phylogeneticTreePageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
});
