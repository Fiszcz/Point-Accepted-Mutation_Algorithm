import * as React from 'react';
import {useEffect} from 'react';
import {css} from "emotion";
import {generateTreeDiagram} from "./PhylogeneticTree";
import {Typography} from "../../components/Typography";
import {theme} from "../../components/theme";

export const PhylogeneticTree = () => {
    useEffect(() => generateTreeDiagram(), []);

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

        <div className={phylogeneticTreePageStyle}>
            <div id={'phylogeneticTree'}/>
        </div>
    </div>
};

// @ts-ignore
const tableCellStyle = css({
    // @ts-ignore
    textAlign: 'center !important',
    '& > *': {
        color: theme.secondaryColor,
    },
});

const phylogeneticTreePageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    margin: '3% 3%',
});
