import { stepsReducer } from '../../../src/reducers/stepsReducer';
import { PAMSteps } from '../../../src/actions/steps/steps';

describe('stepsReducer', () => {
    test('should return the initial state', () => {
        expect(stepsReducer(undefined, {} as any)).toEqual({ step: PAMSteps.WSTEP });
    });

    test('should handle GO_TO action', () => {
        expect(stepsReducer(undefined, { type: 'GO_TO', step: PAMSteps.MACIERZ_PAM })).toEqual({ step: PAMSteps.MACIERZ_PAM });
    });

    test('should handle GO_TO_NEXT_STEP', () => {
        expect(stepsReducer(undefined, { type: 'GO_TO_NEXT_STEP' })).toEqual({ step: PAMSteps.SEKWENCJE_WEJSCIOWE });
        expect(stepsReducer({ step: PAMSteps.DRZEWO_FILOGENETYCZNE }, { type: 'GO_TO_NEXT_STEP' })).toEqual({
            step: PAMSteps.MACIERZ_PODSTAWIEN,
        });
    });
});
