import * as React from 'react';
import {css, cx} from "emotion";
import {Typography} from "../../components/Typography";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {theme} from "../../components/theme";

const Latex = require('react-latex');

interface SubstitutionMatrixProps {
    step?: 2 | 3 | 4 | 6 | 7 | 8;
}

export const SubstitutionMatrix: React.FC<SubstitutionMatrixProps> = ({step}) => {
    const uniqueListOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.uniqueListOfSymbols);
    const substitutionMatrix = useSelector((state: AppState) => state.substitutionMatrix.substitutionMatrix);
    const occurrencesNumberOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.occurrencesNumberOfSymbols);
    const matrixWithDividedValuesByOccurrences = useSelector((state: AppState) => state.substitutionMatrix.matrixWithDividedValuesByOccurrences);
    const lambda = useSelector((state: AppState) => state.substitutionMatrix.lambda);
    const matrixOneStepBeforePAM1 = useSelector((state: AppState) => state.substitutionMatrix.matrixOneStepBeforePAM1);
    const probabilitiesOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.probabilitiesOfSymbols);

    const widthOfTable = uniqueListOfSymbols.length;

    return <>
        {[2, 3].includes(step || 0) &&
        <table className={css({margin: 'auto'})}>
            <tr>
                {uniqueListOfSymbols.split('').map((symbol) => {
                    return <td
                        className={cx(importantCell, css({width: 40 - widthOfTable, height: 40 - widthOfTable}))}>
                        N <sub>{symbol}</sub>
                    </td>
                })}
            </tr>
            <tr>
                {occurrencesNumberOfSymbols.map((occurrencesOfSymbol) => {
                    return <td className={cx(cellOfTable, css({width: 40 - widthOfTable, height: 40 - widthOfTable}))}>
                        {occurrencesOfSymbol}
                    </td>
                })}
            </tr>
        </table>
        }
        {step === 6 &&
        <div className={css({'& > *': {fontSize: 24}})}>
            {React.createElement(Latex, null, "\$\\lambda = " + lambda.toFixed(4) + "$")}
        </div>
        }
        {step === 8 &&
        <div className={css({'& > *': {fontSize: 24}})}>
            {React.createElement(Latex, null, "\$e(i, j) = 2 \\log_{2} \\frac{M_{ij} }{p_j} $")}
        </div>
        }
        <table>
            <td className={cx(importantCell, css({width: 40 - widthOfTable, height: 40 - widthOfTable}))}>
                {[2, 3, 4].includes(step || 0) ?
                    <Typography size={28 - widthOfTable} weight={"bold"}>P<sub>i→j</sub></Typography>
                    : [6, 7, 8].includes(step || 0) ?
                        <Typography size={28 - widthOfTable} weight={"bold"}>M<sub>ij</sub></Typography>
                        : <Typography size={28 - widthOfTable} weight={"bold"}>A<sub>ij</sub></Typography>
                }
            </td>
            {uniqueListOfSymbols.split('').map((symbol) => {
                return <td className={cx(importantCell, css({width: 40 - widthOfTable, height: 40 - widthOfTable}))}>
                    <Typography size={28 - widthOfTable} weight={"bold"}>{symbol}</Typography>
                </td>;
            })}
            {((step === 4 || step === 6) ? matrixWithDividedValuesByOccurrences : ([7, 8].includes(step || 0) ? matrixOneStepBeforePAM1 : substitutionMatrix))
                .map((row, indexOfRow) => {
                    return <tr>
                        {row.map((cell, indexOfColumn) => {
                            return <>
                                {indexOfColumn === 0 &&
                                <td className={cx(importantCell, css({
                                    width: 40 - widthOfTable,
                                    height: 40 - widthOfTable
                                }))}>
                                    <Typography size={28 - widthOfTable}
                                                weight={"bold"}>{uniqueListOfSymbols[indexOfRow]}</Typography>
                                </td>}

                                <td className={cx(cellOfTable, css({
                                    width: step ? 'auto' : (40 - widthOfTable),
                                    height: 40 - widthOfTable
                                }))}>
                                    <Typography size={25 - widthOfTable}>
                                        {[4, 6, 7, 8].includes(step || 0) && cell !== '-'
                                            ? (cell === 0 ? 0 : cell.toPrecision(3))
                                            : (step === 6 && cell === '-' ? ((indexOfColumn === 0 || indexOfColumn === (uniqueListOfSymbols.length - 1)) ?
                                                <div
                                                    className={css({'& > *': {fontSize: 15}})}>{React.createElement(Latex, null, "\$1-\\sum_{j<>i}M_{ij}$")}</div> : '-||-') : cell)}
                                        {step && indexOfColumn !== indexOfRow && [2, 3, 6].includes(step || 0) && <>
                                            &nbsp;{step === 6 ? '*' : '/'}&nbsp;
                                            {step === 2 ? <>N<sub>{uniqueListOfSymbols[indexOfRow]}</sub></>
                                                : step === 3 ? occurrencesNumberOfSymbols[indexOfRow] :
                                                    step === 6 ? React.createElement(Latex, null, "\$\\lambda$") : ''}
                                        </>}
                                    </Typography>
                                </td>
                            </>;
                        })}
                    </tr>
                })}
            {step === 8 && <tr>
                <td className={cx(importantCell, css({
                    width: 40 - widthOfTable,
                    height: 40 - widthOfTable
                }))}>
                    <Typography size={28 - widthOfTable}
                                weight={"bold"}>p<sub>j</sub></Typography>
                </td>
                {probabilitiesOfSymbols.map((probabilityOfSymbol) => {
                    return <td className={cx(importantCell, css({
                        width: 40 - widthOfTable,
                        height: 40 - widthOfTable
                    }))}>
                        <Typography size={28 - widthOfTable}
                                    weight={"bold"}>{probabilityOfSymbol.toFixed(3)}</Typography>
                    </td>
                })}
            </tr>}
        </table>
    </>
};

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
    whiteSpace: 'nowrap',
    padding: 3
});
