import * as React from 'react';
import {css} from "emotion";
import {Typography} from "../../components/Typography";
import {EntrySequencesTable} from "./EntrySequencesTable";
import {JumpToNextStep} from "../../components/JumpToNextStep";
import {GenerateButton} from "./GenerateButton";
import {useState} from "react";
import {generateRandomSequences} from "../../utils/sequences";

export const EntrySequences = () => {
    const [sequences, setSequences] = useState<string[]>([]);

    const removeSequence = (index: number) => () => {
        sequences.splice(index, 1);
        setSequences([...sequences]);
    };

    const addSequence = (sequence: string) => {
        if (sequence)
            setSequences([...sequences, sequence]);
    };

    const handleGenerateSequences = () => {
        setSequences(generateRandomSequences());
    };

    return <div className={entrySequencesPageStyle}>
        <div className={css({display: 'grid', gridGap: '20%', justifyItems: 'center'})}>
            <Typography variant={"headTitle"}>
                Dane wejściowe
            </Typography>

            <Typography>
                Żeby móc skonstruować wyjściową macierz PAM należy na wejściu podać tablicę blisko spokrewnionych ze
                sobą sekwencji białkowych.
            </Typography>

            <GenerateButton onClick={handleGenerateSequences}/>
        </div>

        <EntrySequencesTable sequences={sequences} addSequence={addSequence} handleRemoveSequence={removeSequence}/>

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
