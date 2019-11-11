import * as React from 'react';
import {IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField} from "@material-ui/core";
import {Add, Clear} from "@material-ui/icons";
import {css} from "emotion";
import {theme} from "../../components/theme";
import {Typography} from "../../components/Typography";

const data = ['12345678901234567890', 'TTTRFDXX', 'RXSSESEYYYY', "RXSSESEYYYY", 'SDFEESESE', 'TTTRFDXX', 'RXSSESEYYYY', "RXSSESEYYYY", 'SDFEESESE', 'TTTRFDXX', 'RXSSESEYYYY', "RXSSESEYYYY"];

export const EntrySequencesTable = () => {
    return <div className={css({width: '100%'})}>
        <Typography weight={'bold'}>
            Tablica sekwencji
        </Typography>
        <Table size={"small"} className={tableStyle}>
            <col style={{width: '20%'}}/>
            <col style={{width: '60%'}}/>
            <col style={{width: '20%'}}/>
            <TableHead>
                <TableRow>
                    <TableCell className={tableHeadCellStyle}><Typography weight={'bold'}>lp.</Typography></TableCell>
                    <TableCell className={tableHeadCellStyle}><Typography weight={'bold'}>Sekwencja</Typography></TableCell>
                    <TableCell className={tableHeadCellStyle}><Typography weight={'bold'}>Akcja</Typography></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.map((sequence, index) =>
                    <TableRow key={index}>
                        <TableCell className={tableCellStyle}>
                            <Typography weight={'bold'}>{index + 1}</Typography>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <TextField value={sequence} className={textFieldStyle}/>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <IconButton>
                                <Clear className={removeSequenceButtonStyle}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell className={tableCellStyle}>
                        <Typography weight={'bold'}>Nowa</Typography>
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                        <TextField value={'FFFGRERGDRGDR'} className={textFieldStyle}/>
                    </TableCell>
                    <TableCell className={tableCellStyle}>
                        <IconButton>
                            <Add className={addSequenceButtonStyle}/>
                        </IconButton>
                    </TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    </div>;
};

// @ts-ignore
const textFieldStyle = css({
    '& > div > input': {
        // @ts-ignore
        textAlign: 'center !important',
        color: theme.secondaryColor,
    }
});

const tableStyle = css({
    marginTop: '15px',
});

// @ts-ignore
const tableHeadCellStyle = css({
    // @ts-ignore
    textAlign: 'center !important',
    '& > *': {
        color: theme.secondaryColor,
    },
});

// @ts-ignore
const tableCellStyle = css({
    // @ts-ignore
    textAlign: 'center !important',
    padding: '0px !important',
    '& > *': {
        color: theme.secondaryColor,
    },
});

const removeSequenceButtonStyle = css({
    color: 'rgba(255,88,88,0.36)',
    '& :hover': {
        color: 'rgba(251,38,38,0.75)',
    }
});

const addSequenceButtonStyle = css({
    color: theme.firstColor,
});
