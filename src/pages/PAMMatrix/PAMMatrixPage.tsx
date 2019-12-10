import * as React from 'react';
import {Typography} from "../../components/Typography";
import {css} from "emotion";

export const PamMatrixPage = () => {
    return <div className={PAMMatrixPageStyle}>
        <div>
            <Typography variant={"headTitle"}>
                Macierz PAM1
            </Typography>
            <br/>
            <Typography>
                Otrzymujemy na wyjściu macierz PAM 1.
            </Typography>
        </div>
    </div>;
};

const PAMMatrixPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '5% 10%',
    width: '100%',
});
