import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { Typography } from '../../components/Typography';
import { css, cx } from 'emotion';
import { theme } from '../../components/theme';

export const FirstStep = () => {
    const sequences = useSelector((state: AppState) => state.sequences.sequences);
    const uniqueListOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.uniqueListOfSymbols);
    const occurrencesNumberOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.occurrencesNumberOfSymbols);
    const lengthOfAllSequences = useSelector((state: AppState) => state.substitutionMatrix.lengthOfAllSequences);
    const probabilitiesOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.probabilitiesOfSymbols);

    const widthOfTable = uniqueListOfSymbols.length;

    return (
        <div className={containerStyle}>
            <div>
                <Typography variant={'subtitle'}>Lista sekwencji wejściowych:</Typography>
                <br />
                {sequences.map(sequence => {
                    return (
                        <>
                            <Typography>{sequence}</Typography>
                            <br />
                        </>
                    );
                })}
            </div>
            <div>
                <Typography variant={'subtitle'}>Ogólna liczba reszt (symboli)</Typography>
                <Typography variant={'title'}>N = {lengthOfAllSequences}</Typography>
                <br />
                <Typography variant={'subtitle'}>Liczebność dla poszczególnych reszt:</Typography>
                <table className={tableStyle}>
                    <tr>
                        {uniqueListOfSymbols.split('').map(symbol => {
                            return (
                                <td className={cx(importantCell, sizeOfCell(widthOfTable))}>
                                    N <sub>{symbol}</sub>
                                </td>
                            );
                        })}
                    </tr>
                    <tr>
                        {occurrencesNumberOfSymbols.map(occurrencesOfSymbol => {
                            return <td className={cx(cellOfTable, sizeOfCell(widthOfTable))}>{occurrencesOfSymbol}</td>;
                        })}
                    </tr>
                </table>
                <br />
                <Typography variant={'subtitle'}>Prawdopodobieństwa wystąpienia reszty:</Typography>
                <table className={tableStyle}>
                    <tr>
                        {uniqueListOfSymbols.split('').map(symbol => {
                            return (
                                <td className={cx(importantCell, sizeOfCell(widthOfTable))}>
                                    p <sub>{symbol}</sub>
                                </td>
                            );
                        })}
                    </tr>
                    <tr>
                        {probabilitiesOfSymbols.map(probabilityOfSymbol => {
                            return <td className={cx(cellOfTable, sizeOfCell(widthOfTable))}>{probabilityOfSymbol.toFixed(3)}</td>;
                        })}
                    </tr>
                </table>
            </div>
        </div>
    );
};

const tableStyle = css({
    margin: 'auto',
});

const containerStyle = css({
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
});

const sizeOfCell = (widthOfTable: number) =>
    css({
        width: 40 - widthOfTable,
        height: 40 - widthOfTable,
    });

const importantCell = css({
    width: 40,
    height: 40,
    border: `2px solid ${theme.firstColor}`,
    borderRadius: '3px',
    backgroundColor: '#2699fbbd',
    color: 'white',
    verticalAlign: 'middle',
});

const cellOfTable = css({
    width: 40,
    height: 40,
    border: `2px solid ${theme.firstColor}`,
    borderRadius: '3px',
    verticalAlign: 'middle',
    backgroundColor: 'white',
});
