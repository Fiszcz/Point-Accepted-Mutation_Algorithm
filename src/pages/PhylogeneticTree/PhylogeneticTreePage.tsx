import * as React from 'react';
import {css} from "emotion";
import {useEffect} from "react";
import {generateTreeDiagram} from "./PhylogeneticTree";
import {Typography} from "../../components/Typography";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {theme} from "../../components/theme";

const data = ['12345678901234567890', 'TTTRFDXX', 'RXSSESEYYYY', "RXSSESEYYYY", 'SDFEESESE', 'TTTRFDXX', 'RXSSESEYYYY', "RXSSESEYYYY", 'SDFEESESE', 'TTTRFDXX', 'RXSSESEYYYY', "RXSSESEYYYY"];

export const PhylogeneticTree = () => {
    useEffect(() => generateTreeDiagram(), []);

    return <div className={phylogeneticTreePageStyle}>
        <div>
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

        <div className={css({display: 'flex'})}>
            <Table size={"small"}>
                <TableHead>
                    <TableCell className={tableCellStyle}>
                        <Typography weight={"bold"}>lp.</Typography>
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                        <Typography weight={"bold"}>Sekwencja</Typography>
                    </TableCell>
                </TableHead>
                <TableBody>
                    {data.map((sequence, index) => (
                        <TableRow>
                            <TableCell className={tableCellStyle}>
                                <Typography weight={'bold'} size={21}>{index + 1}</Typography>
                            </TableCell>
                            <TableCell className={tableCellStyle}>
                                <Typography>{sequence}</Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
    margin: '5% 5%',
});
