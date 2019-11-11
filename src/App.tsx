import React from 'react';
import {Sidenav} from "./components/Sidenav";
import 'normalize.css';
import {StepPage} from "./components/StepPage";
import {css} from "emotion";
import {IntroductionPage} from "./pages/Introduction/IntroductionPage";

const App: React.FC = () => {
  return (
      <div className={css({display: 'grid', gridTemplateColumns: '22% auto', height: '100vh'})}>
        <Sidenav/>
        <div className={css({height: '100%', position: 'relative'})}>
            <StepPage>
                <IntroductionPage/>
            </StepPage>
        </div>
    </div>
  );
};

export default App;
