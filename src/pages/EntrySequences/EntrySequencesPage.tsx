import * as React from 'react';
import {css} from "emotion";
import {Typography} from "../../components/Typography";
import {EntrySequencesTable, letters} from "./EntrySequencesTable";
import {JumpToNextStep} from "../../components/JumpToNextStep";
import {GenerateButton} from "./GenerateButton";
import {generateRandomSequences} from "../../utils/sequences";
import {useDispatch, useSelector} from "react-redux";
import {setSequences} from "../../actions/sequences/sequences";
import {AppState} from "../../store";

export const EntrySequences = () => {
    const sequences = useSelector((state: AppState) => state.sequences.sequences);
    const dispatch = useDispatch();

    const removeSequence = (index: number) => () => {
        sequences.splice(index, 1);
        dispatch(setSequences([...sequences]));
    };

    const addSequence = (sequence: string) => {
        if (sequence)
            dispatch(setSequences([...sequences, sequence]));
    };

    const handleGenerateSequences = () => {
        dispatch(setSequences(generateRandomSequences()));
    };

    const editSequence = (index: number, sequence: string) => {
        if ((sequence.match(letters) && sequence.length < 14) || sequence === '') {
            sequences[index] = sequence;
            dispatch(setSequences([...sequences]));
        }
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

        <EntrySequencesTable addSequence={addSequence} handleRemoveSequence={removeSequence} handleChangeSequence={editSequence}/>

        <div className={goToNextStepStyle}>
            <JumpToNextStep>Tworzenie drzewa filogenetycznego</JumpToNextStep>
        </div>
    </div>
};

const goToNextStepStyle = css({gridColumn: '1 / span 2', alignSelf: 'end'});

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
