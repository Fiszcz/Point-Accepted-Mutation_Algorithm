import React from 'react';
import { Sidenav } from './components/Sidenav';
import 'normalize.css';
import { StepPage } from './components/StepPage';
import { css } from 'emotion';
import { IntroductionPage } from './pages/Introduction/IntroductionPage';
import { EntrySequences } from './pages/EntrySequences/EntrySequencesPage';
import { useSelector } from 'react-redux';
import { PAMSteps } from './actions/steps/steps';
import { PhylogeneticTree } from './pages/PhylogeneticTree/PhylogeneticTreePage';
import { AppState } from './store';
import { SubstitutionMatrixPage } from './pages/SubstitutionMatrix/SubstitutionMatrixPage';
import { PamMatrixPage } from './pages/PAMMatrix/PAMMatrixPage';

const App: React.FC = () => {
    const step = useSelector((state: AppState) => state.steps.step);

    const getStepPage = () => {
        switch (step) {
            case PAMSteps.WSTEP:
                return <IntroductionPage />;
            case PAMSteps.SEKWENCJE_WEJSCIOWE:
                return <EntrySequences />;
            case PAMSteps.DRZEWO_FILOGENETYCZNE:
                return <PhylogeneticTree />;
            case PAMSteps.MACIERZ_PODSTAWIEN:
                return <SubstitutionMatrixPage />;
            case PAMSteps.MACIERZ_PAM:
                return <PamMatrixPage />;
        }
    };

    return (
        <div className={css({ display: 'grid', gridTemplateColumns: '22% auto', height: '100vh' })}>
            <Sidenav />
            <div className={css({ height: '100%', position: 'relative' })}>
                <StepPage>{getStepPage()}</StepPage>
            </div>
        </div>
    );
};

export default App;
