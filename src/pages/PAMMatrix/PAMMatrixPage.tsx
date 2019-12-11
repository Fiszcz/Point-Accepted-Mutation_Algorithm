import * as React from 'react';
import {Typography} from "../../components/Typography";
import {css} from "emotion";
import {PamMatrix} from "./PAMMatrix";

export const PamMatrixPage = () => {
    return <div className={PAMMatrixPageStyle}>
        <div>
            <Typography variant={"title"}>
                Macierz PAM1
            </Typography>
            <br/>
            <Typography variant={"headTitle"}>
                Otrzymujemy na wyjściu macierz PAM 1.
            </Typography>
        </div>
        <PamMatrix/>
    </div>;
};

const PAMMatrixPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '5% 10%',
    width: '100%',
});
