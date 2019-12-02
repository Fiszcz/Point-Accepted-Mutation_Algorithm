export enum PAMSteps {
    WSTEP = 0,
    SEKWENCJE_WEJSCIOWE = 1,
    DRZEWO_FILOGENETYCZNE = 2,
    MACIERZ_PODSTAWIEN = 3,
    MACIERZ_PAM = 4,
    EKSTRAPOLACJA_PAM = 5,
}

export interface GoToStep {
    type: 'GO_TO',
    step: PAMSteps,
}

export interface GoToNextStep {
    type: 'GO_TO_NEXT_STEP',
}

export type StepsActions = GoToStep | GoToNextStep;

export function goToStep(step: PAMSteps): GoToStep {
    return {
        type: "GO_TO",
        step,
    };
}

export function goToNextStep(): GoToNextStep {
    return {
        type: 'GO_TO_NEXT_STEP',
    }
}
