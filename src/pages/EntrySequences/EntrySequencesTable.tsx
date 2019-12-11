import * as React from 'react';
import {IconButton, Table, TableBody, TableCell, TableFooter, TableHead, TableRow, TextField} from "@material-ui/core";
import {Add, Clear} from "@material-ui/icons";
import {css} from "emotion";
import {theme} from "../../components/theme";
import {Typography} from "../../components/Typography";
import {useCallback, useState} from "react";
import {useSelector} from "react-redux";
import {AppState} from "../../store";

export const letters = /^[A-Za-z]+$/;

interface EntrySequencesTableProps {
    addSequence: (sequence: string) => void;
    handleRemoveSequence: (index: number) => () => void;
    handleChangeSequence: (index: number, newValue: string) => void;
}

export const EntrySequencesTable: React.FC<EntrySequencesTableProps> = (props) => {
    const sequences = useSelector((state: AppState) => state.sequences.sequences);
    const [newSequence, setNewSequence] = useState<string>('');

    const handleChangeNewSequence = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        if ((inputValue.match(letters) && inputValue.length < 14) || inputValue === '')
            setNewSequence(inputValue.toUpperCase());
    };

    const handleDetectEnter = (event: React.KeyboardEvent) => {
        if (event.keyCode === 13)
            addSequence();
    };

    const addSequence = () => {
        setNewSequence('');
        props.addSequence(newSequence);
    };

    const handleChangeSequence = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        props.handleChangeSequence(Number(event.target.name), event.target.value);
    }, []);

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
                {sequences.map((sequence, index) =>
                    <TableRow key={index}>
                        <TableCell className={tableCellStyle}>
                            <Typography weight={'bold'}>{index + 1}</Typography>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <TextField value={sequence} className={textFieldStyle} onChange={handleChangeSequence} name={index.toString()}/>
                        </TableCell>
                        <TableCell className={tableCellStyle}>
                            <IconButton onClick={props.handleRemoveSequence(index)}>
                                <Clear className={removeSequenceButtonStyle}/>
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            {sequences.length < 10 &&
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
                            <IconButton onClick={addSequence}>
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
    },
    'input': {
        textTransform: 'uppercase',
    },
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
