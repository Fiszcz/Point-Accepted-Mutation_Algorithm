import * as React from 'react';
import {IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField} from "@material-ui/core";
import {Add, Clear} from "@material-ui/icons";
import {css} from "emotion";
import {theme} from "../../components/theme";
import {Typography} from "../../components/Typography";
import {useState} from "react";

const letters = /^[A-Za-z]+$/;

interface EntrySequencesTableProps {
    sequences: string[];

    addSequence: (sequence: string) => void;
    handleRemoveSequence: (index: number) => () => void;
}

export const EntrySequencesTable: React.FC<EntrySequencesTableProps> = (props) => {
    const [newSequence, setNewSequence] = useState<string>('');

    const handleChangeNewSequence = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if (inputValue.match(letters) && inputValue.length < 14)
            setNewSequence(inputValue.toUpperCase());
    };

    const handleDetectEnter = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13)
            props.addSequence(newSequence);
    };

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
                {props.sequences.map((sequence, index) =>
                    <TableRow key={index}>
                        <TableCell className={tableCellStyle}>
                            <Typography weight={'bold'}>{index + 1}</Typography>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <TextField value={sequence} className={textFieldStyle}/>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <IconButton onClick={props.handleRemoveSequence(index)}>
                                <Clear className={removeSequenceButtonStyle}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {props.sequences.length < 10 &&
                <TableFooter>
                    <TableRow>
                        <TableCell className={tableCellStyle}>
                            <Typography weight={'bold'}>Nowa</Typography>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <TextField value={newSequence} className={textFieldStyle} onChange={handleChangeNewSequence}
                                       onKeyUp={handleDetectEnter}/>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <IconButton onClick={() => props.addSequence(newSequence)}>
                                <Add className={addSequenceButtonStyle}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableFooter>
            }
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
