import * as React from 'react';
import {css} from "emotion";
import {Typography} from "../../components/Typography";
import {EntrySequencesTable} from "./EntrySequencesTable";
import {JumpToNextStep} from "../../components/JumpToNextStep";
import {GenerateButton} from "./GenerateButton";

export const EntrySequences = () => {
    return <div className={entrySequencesPageStyle}>
        <div className={css({display: 'grid', gridGap: '20%', justifyItems: 'center'})}>
            <Typography variant={"headTitle"}>
                Dane wejściowe
            </Typography>

            <Typography>
                Żeby móc skonstruować wyjściową macierz PAM należy na wejściu podać tablicę blisko spokrewnionych ze
                sobą sekwencji białkowych.
            </Typography>

            <GenerateButton/>
        </div>

        <EntrySequencesTable/>

        <div className={css({gridColumn: '1 / span 2', alignSelf: 'end'})}>
            <JumpToNextStep>Tworzenie drzewa filogenetycznego</JumpToNextStep>
        </div>
    </div>
};

const entrySequencesPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    margin: '5% 5%',
    gridTemplateColumns: '50% 50%',
    '& > div:first-of-type': {
        marginRight: '4%',
    }
});
