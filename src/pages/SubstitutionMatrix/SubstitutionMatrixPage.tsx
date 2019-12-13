import * as React from 'react';
import { useState } from 'react';
import { Typography } from '../../components/Typography';
import { css } from 'emotion';
import { NextStep } from '../../components/NextStep';
import { SubstitutionMatrix } from './SubstitutionMatrix';
import { PreviousStep } from '../../components/PreviousStep';
import { FirstStep } from './FirstStep';
import { Divider } from '@material-ui/core';
import { ThirdStep } from './ThirdStep';
import { JumpToNextStep } from '../../components/JumpToNextStep';

export const SubstitutionMatrixPage = () => {
    const [step, setStep] = useState(0);

    const handleNextStep = () => {
        setStep(step => step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step => step - 1);
    };

    return (
        <div className={substitutionMatrixPageStyle}>
            <div className={css({ padding: '0% 2%' })}>
                <Typography variant={'headTitle'}>Macierz podstawień</Typography>
                <br />
                {step === 0 && (
                    <>
                        <Typography>
                            Na podstawie zrekonstruowanego drzewa filogenetycznego tworzona jest symetryczna macierz podstawień. Jest to
                            dwuwymiarowa macierz zawierająca wartości prawdopodobieństwa zamiany jednej reszty aminokwasowej lub
                            nukleotydowej na inną w trakcie ewolucji sekwencji.
                        </Typography>
                    </>
                )}
                {step === 1 && (
                    <>
                        <Divider className={dividerStyle} />
                        <br />
                        <Typography variant={'headTitle'}>Krok 1:</Typography>
                        <Typography>
                            Zanim przejdziemy do dalszych obliczeń policzmy prawdopodieństwa wystąpienia danych reszt (symboli) w
                            sekwencjach. Do tego celu potrzebujemy sumę wszystkich reszt z sekwencji wejściowych, oraz sumę wystąpień dla
                            poszczególnych reszt.
                        </Typography>
                    </>
                )}
                {[2, 3, 4].includes(step) && (
                    <>
                        <Divider className={dividerStyle} />
                        <br />
                        <Typography variant={'headTitle'}>Krok 2:</Typography>
                        <Typography>
                            Gdy mamy już wyliczone wszystkie prawdopodobieństwa wystąpień reszt w sekwencjach możemy policzyć szacowane
                            prawdopodobieństwa zmiany{' '}
                            <i>
                                <b>i</b>
                            </i>
                            -tego symbolu na{' '}
                            <i>
                                <b>j</b>
                            </i>
                            -ty symbol.
                        </Typography>
                    </>
                )}
                {step === 5 && (
                    <>
                        <Divider className={dividerStyle} />
                        <br />
                        <Typography variant={'headTitle'}>Krok 3:</Typography>
                        <Typography>Wyliczmy teraz wartość lamda, która posłuży nam do dalszych obliczeń</Typography>
                    </>
                )}
                {step === 6 && (
                    <>
                        <Divider className={dividerStyle} />
                        <br />
                        <Typography variant={'headTitle'}>Krok 4:</Typography>
                        <Typography>Każdy element tablicy jest teraz mnożony przez wartość obliczonej wartości lambda.</Typography>
                    </>
                )}
                {step === 7 && (
                    <>
                        <Divider className={dividerStyle} />
                        <br />
                        <Typography variant={'headTitle'}>Krok 4:</Typography>
                        <Typography>Znormalizowana macierz podstawień</Typography>
                    </>
                )}
                {step === 8 && (
                    <>
                        <Divider className={dividerStyle} />
                        <br />
                        <Typography variant={'headTitle'}>Krok 5:</Typography>
                        <Typography>
                            W macierzach substytucji do opisania prawdopodobieństwa substytucji aminokwasowych stosuje się konwersje
                            logarytmiczne. Konwertowane wartości nazywa się logarytmami ilorazu szans - są to logarytmy stosunku częstości
                            obserwowanych mutacji do prawdopodobieństwa losowego zaistnienia substytucji.
                        </Typography>
                    </>
                )}
            </div>

            {step === 0 && <SubstitutionMatrix />}

            {step === 1 && <FirstStep />}

            {(step === 2 || step === 3 || step === 4) && (
                <>
                    <SubstitutionMatrix step={step} />
                </>
            )}

            {step === 5 && <ThirdStep />}

            {(step === 6 || step === 7) && <SubstitutionMatrix step={step} />}

            {step === 8 && <SubstitutionMatrix step={step} />}

            <div className={css({ display: 'flex' })}>
                {step > 0 && <PreviousStep onClick={handlePreviousStep} />}
                {step < 8 && <NextStep onClick={handleNextStep} />}
            </div>
            {step === 8 && <JumpToNextStep>Wyświetl macierz PAM</JumpToNextStep>}
        </div>
    );
};

const dividerStyle = css({
    height: '4px !important',
});

const substitutionMatrixPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '5% 0%',
    width: '100%',
    overflow: 'auto',
});
