import * as React from 'react';
import {useState} from 'react';
import {Typography} from "../../components/Typography";
import {css} from "emotion";
import {NextStep} from "../../components/NextStep";
import {SubstitutionMatrix} from "./SubstitutionMatrix";
import {PreviousStep} from "../../components/PreviousStep";
import {FirstStep} from "./FirstStep";
import {Divider} from "@material-ui/core";
import {ThirdStep} from "./ThirdStep";
import {JumpToNextStep} from "../../components/JumpToNextStep";

export const SubstitutionMatrixPage = () => {
    const [step, setStep] = useState(0);

    const handleNextStep = () => {
        setStep(step => step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step => step - 1);
    };

    return <div className={substitutionMatrixPageStyle}>
        <div className={css({padding: '0% 2%'})}>
            <Typography variant={"headTitle"}>
                Macierz podstawień
            </Typography>
            <br/>
            {step === 0 && <>
                <Typography>
                    Na podstawie zrekonstruowanego drzewa filogenetycznego tworzona jest symetryczna macierz podstawień,
                    zawierającą informacje o częstości występowania substytucji między symbolami.
                </Typography>
            </>
            }
            {step === 1 && <>
                <Divider className={css({height: '4px !important'})}/>
                <br/>
                <Typography variant={"headTitle"}>
                    Krok 1:
                </Typography>
                <Typography>
                    Zanim przejdziemy do dalszych obliczeń musimy policzyć prawdopodieństwa wystąpienia danych symboli w sekwencjach.
                    Do tego celu potrzebujemy sumę wszystkich symboli z sekwencji wejściowych, oraz sumę wystąpień dla poszczególnych symboli.
                </Typography>
            </>}
            {[2, 3, 4].includes(step) && <>
                <Divider className={css({height: '4px !important'})}/>
                <br/>
                <Typography variant={"headTitle"}>
                    Krok 2:
                </Typography>
                <Typography>
                    Gdy mamy już wyliczone wszystkie prawdopodobieństwa wystąpień symboli w sekwencjach możemy policzyć szacowane prawdopodobieństwa zmiany <i><b>i</b></i>-tego symbolu na <i><b>j</b></i>-ty symbol.
                </Typography>
            </>}
            {step === 5 && <>
                <Divider className={css({height: '4px !important'})}/>
                <br/>
                <Typography variant={"headTitle"}>
                    Krok 3:
                </Typography>
                <Typography>
                    Wyliczmy teraz wartość lamda, która posłuży nam do obliczenia ...
                </Typography>
            </>}
            {step === 6 && <>
                <Divider className={css({height: '4px !important'})}/>
                <br/>
                <Typography variant={"headTitle"}>
                    Krok 4:
                </Typography>
                <Typography>
                    Każdy element tablicy jest teraz mnożony przez wartość obliczonej wartości lambda.
                </Typography>
            </>}
            {step === 7 && <>
                <Divider className={css({height: '4px !important'})}/>
                <br/>
                <Typography variant={"headTitle"}>
                    Krok 4:
                </Typography>
                <Typography>
                    Jesteśmy już o krok od macierzy PAM
                </Typography>
            </>}
            {step === 8 && <>
                <Divider className={css({height: '4px !important'})}/>
                <br/>
                <Typography variant={"headTitle"}>
                    Krok 5:
                </Typography>
                <Typography>
                    Stosujac poniższy wzór do każdej komórki macierzy otrzymamy na wyjściu macierz PAM.
                </Typography>
            </>}
        </div>

        {step === 0 && <SubstitutionMatrix/>}

        {step === 1 && <FirstStep/>}

        {(step === 2 || step === 3 || step === 4) && <>
        <SubstitutionMatrix step={step}/>
        </>}

        {step === 5 && <ThirdStep/>}

        {(step === 6 || step === 7) && <SubstitutionMatrix step={step}/>}

        {step === 8 && <SubstitutionMatrix step={step}/>}

        <div className={css({display: 'flex'})}>
            {step > 0 &&
            <PreviousStep onClick={handlePreviousStep}/>
            }
            {step < 8 && <NextStep onClick={handleNextStep}/>}
        </div>
        {step === 8 && <JumpToNextStep>Wyświetl macierz PAM</JumpToNextStep>}
    </div>
};

const substitutionMatrixPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '5% 0%',
    width: '100%',
});
