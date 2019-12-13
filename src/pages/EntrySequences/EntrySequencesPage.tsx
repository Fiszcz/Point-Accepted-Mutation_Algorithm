import * as React from 'react';
import { css } from 'emotion';
import { Typography } from '../../components/Typography';
import { EntrySequencesTable, letters } from './EntrySequencesTable';
import { JumpToNextStep } from '../../components/JumpToNextStep';
import { GenerateButton } from './GenerateButton';
import { generateRandomSequences } from '../../utils/sequences';
import { useDispatch, useSelector } from 'react-redux';
import { setSequences } from '../../actions/sequences/sequences';
import { AppState } from '../../store';

export const EntrySequences = () => {
    const sequences = useSelector((state: AppState) => state.sequences.sequences);
    const dispatch = useDispatch();

    const hasMinimumNumberOfSequences = sequences.length > 2;
    const hasValidLengthOfSequences = sequences.every((sequence: string) => sequence.length === sequences[0].length);
    const isFormValid = hasValidLengthOfSequences && hasMinimumNumberOfSequences;

    const removeSequence = (index: number) => () => {
        sequences.splice(index, 1);
        dispatch(setSequences([...sequences]));
    };

    const addSequence = (sequence: string) => {
        if (sequence) dispatch(setSequences([...sequences, sequence]));
    };

    const handleGenerateSequences = () => {
        dispatch(setSequences(generateRandomSequences()));
    };

    return (
        <div className={entrySequencesPageStyle}>
            <div className={css({ display: 'grid', gridGap: '20%', justifyItems: 'center' })}>
                <Typography variant={'headTitle'}>Dane wejściowe</Typography>

                <Typography>
                    Żeby móc skonstruować wyjściową macierz PAM należy na wejściu podać tablicę blisko spokrewnionych ze sobą sekwencji
                    białkowych.
                </Typography>

                <GenerateButton onClick={handleGenerateSequences} />

                {!hasMinimumNumberOfSequences && (
                    <Typography className={validationMessage}>Należy podać przynajmniej trzy sekwencje żeby przejść dalej</Typography>
                )}
                {!hasValidLengthOfSequences && (
                    <Typography className={validationMessage}>Wszystkie sekwencje powinny mieć tą samą długość</Typography>
                )}
            </div>

            <EntrySequencesTable addSequence={addSequence} handleRemoveSequence={removeSequence} />

            <div className={goToNextStepStyle}>
                <JumpToNextStep disabled={!isFormValid}>Tworzenie drzewa filogenetycznego</JumpToNextStep>
            </div>
        </div>
    );
};

const validationMessage = css({
    color: '#ff000096',
});

const goToNextStepStyle = css({ gridColumn: '1 / span 2', alignSelf: 'end' });

const entrySequencesPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    margin: '5% 5%',
    gridTemplateColumns: '50% 50%',
    '& > div:first-of-type': {
        marginRight: '4%',
    },
    overflow: 'auto',
});
