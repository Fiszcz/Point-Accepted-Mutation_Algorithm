import * as React from 'react';
import {Steps} from "../consts/steps";
import {Typography} from "./Typography";
import {css, cx} from "emotion";
import {theme} from "./theme";

interface NavigationProps {
    selectedStep?: keyof typeof Steps,
}

export const Navigation: React.FC<NavigationProps> = ({selectedStep = 'Macierz podstawień'}) => {
    return <nav className={css({position: 'relative'})}>
        {Steps.map(step =>
            <div className={css({display: 'flex', alignItems: 'center', marginBottom: 45})}>
                {selectedStep === step ? <SelectedDotIndicator/> : <DotIndicator/>}
                <Typography size={24} weight={'light'} className={css({marginLeft: 20})}>{step}</Typography>
            </div>
        )}
        <DotConnector/>
    </nav>;
};

const DotConnector: React.FC = () => <svg height="370" className={css({position: 'absolute', top: 0, left: 20})}>
    <line x1="0" y1="0" x2="0" y2="370" className={css({stroke: 'white', strokeWidth:2})} />
</svg>;

const DotIndicator: React.FC = () => <span className={dotIndicatorStyle}/>;

const SelectedDotIndicator: React.FC = () => <span className={selectedDotIndicatorStyle}/>;

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
