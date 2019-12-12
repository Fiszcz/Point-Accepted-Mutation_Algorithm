import * as React from 'react';
import { Typography } from '../../components/Typography';
import { css } from 'emotion';
import { PamMatrix } from './PAMMatrix';

export const PamMatrixPage = () => {
    return (
        <div className={PAMMatrixPageStyle}>
            <div>
                <Typography variant={'title'}>Macierz PAM1</Typography>
                <br />
                <Typography variant={'headTitle'}>
                    Jednostka PAM1 jest zdefiniowana jako zamiana 1% aminokwasów albo jako jedna mutacja na 100 reszt.
                    <br />
                    Wartości dodatnie w macierzy oznaczają substytucje zdarzające się częściej, niż oczekuje się wśród zastąpień
                    konserwowanych ewolucyjnie. Natomiast wartości ujemne odpowiadają substytucjom, które zdarzają się rzadziej, niż
                    oczekiwano.
                </Typography>
            </div>
            <PamMatrix />
        </div>
    );
};

const PAMMatrixPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '5% 10%',
    width: '100%',
});
