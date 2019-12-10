import * as React from 'react';
import {Steps} from "../consts/steps";
import {Typography} from "./Typography";
import {css} from "emotion";
import {theme} from "./theme";
import {useDispatch, useSelector} from "react-redux";
import {goToStep} from "../actions/steps/steps";
import {AppState} from "../store";

export const Navigation: React.FC = () => {
    const currentStep = useSelector((state: AppState) => state.steps.step);
    const dispatch = useDispatch();

    const handleGoToStep = (step: number) => () => {
        dispatch(goToStep(step));
    };

    return <nav className={css({position: 'relative'})}>
        {Steps.map((step, index) =>
            <div className={stepStyle} key={step} onClick={handleGoToStep(index)}>
                {currentStep === index ? <SelectedDotIndicator/> : <DotIndicator/>}
                <Typography size={18} weight={'light'} className={stepText}>{step}</Typography>
            </div>
        )}
        <DotConnector/>
    </nav>;
};

const DotConnector: React.FC = () => <svg height="390" className={css({position: 'absolute', top: 5, left: 20, width: 1})}>
    <line x1="0" y1="0" x2="0" y2="300" className={css({stroke: 'white', strokeWidth:2})} />
</svg>;

const DotIndicator: React.FC = () => <span className={dotIndicatorStyle}/>;

const SelectedDotIndicator: React.FC = () => <span className={selectedDotIndicatorStyle}/>;

const stepStyle = css({
    '&:hover > *': {
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    display: 'flex',
    alignItems: 'center',
    marginBottom: 45,
});

const stepText = css({
    marginLeft: 20,
});

const dotIndicatorStyle = css({
    height: 25,
    width: 25,
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'inline-block',
    marginLeft: 8,
    marginRight: 8,
    zIndex: 1,
});

const selectedDotIndicatorStyle = css({
    height: 25,
    width: 25,
    borderRadius: '50%',
    display: 'inline-block',
    backgroundColor: theme.secondaryColor,
    boxShadow: `0 0 0 8px white`,
    margin: 8,
    zIndex: 1,
});
