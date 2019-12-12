import * as React from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../store';
import { Typography } from '../../components/Typography';
import { css, cx } from 'emotion';
import { theme } from '../../components/theme';
import { percentageToColor } from '../../utils/color';

export const PamMatrix = () => {
    const PAM1Matrix = useSelector((state: AppState) => state.substitutionMatrix.PAM1Matrix);
    const uniqueListOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.uniqueListOfSymbols);

    let PAMMinValue = 0;
    let PAMMaxValue = 0;
    PAM1Matrix.forEach(row => {
        row.forEach(cell => {
            if (isFinite(cell)) {
                if (cell < PAMMinValue) PAMMinValue = cell;
                else if (cell > PAMMaxValue) PAMMaxValue = cell;
            }
        });
    });

    const widthOfTable = uniqueListOfSymbols.length;

    return (
        <div>
            <table>
                <tr>
                    <td className={cx(importantCell, sizeOfCell(widthOfTable))}>
                        <Typography size={28 - widthOfTable} weight={'bold'}>
                            PAM1
                        </Typography>
                    </td>
                    {uniqueListOfSymbols.split('').map(symbol => {
                        return (
                            <td
                                className={cx(
                                    importantCell,
                                    css({
                                        width: 40 - widthOfTable,
                                        height: 40 - widthOfTable,
                                    }),
                                )}
                            >
                                <Typography size={28 - widthOfTable} weight={'bold'}>
                                    {symbol}
                                </Typography>
                            </td>
                        );
                    })}
                </tr>
                {PAM1Matrix.map((row, indexOfRow) => {
                    return (
                        <tr>
                            {row.map((cell, indexOfColumn) => {
                                return (
                                    <>
                                        {indexOfColumn === 0 && (
                                            <td className={cx(importantCell, sizeOfCell(widthOfTable))}>
                                                <Typography size={28 - widthOfTable} weight={'bold'}>
                                                    {uniqueListOfSymbols[indexOfRow]}
                                                </Typography>
                                            </td>
                                        )}
                                        <td
                                            className={cx(
                                                cellOfTable,
                                                sizeOfCell(widthOfTable),
                                                css({
                                                    backgroundColor: percentageToColor(
                                                        cell > 0
                                                            ? (cell / PAMMaxValue) * 50 + 50
                                                            : cell === 0
                                                            ? 50
                                                            : 50 - (cell / PAMMinValue) * 50,
                                                    ),
                                                }),
                                            )}
                                        >
                                            <Typography
                                                size={25 - widthOfTable}
                                                className={css({ color: isFinite(cell) ? 'white' : theme.secondaryColor })}
                                            >
                                                {isFinite(cell) ? cell : 0}
                                            </Typography>
                                        </td>
                                    </>
                                );
                            })}
                        </tr>
                    );
                })}
            </table>
        </div>
    );
};

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
    whiteSpace: 'nowrap',
    padding: 3,
});
