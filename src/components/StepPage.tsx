import * as React from 'react';
import {css, cx} from "emotion";
import {theme} from "./theme";

interface StepPageProps {
    className?: string;
}

export const StepPage: React.FC<StepPageProps> = ({children, className}) => {
    return <div className={cx(stepPageStyle, className)}>
        {children}
    </div>
};

const stepPageStyle = css({
    position: 'absolute',
    top: 40,
    bottom: 40,
    left: 40,
    right: 40,
    backgroundColor: theme.thirdColor,
    color: theme.secondaryColor,
    textAlign: 'center',
    display: 'flex',
    border: `3px solid ${theme.firstColor}`,
    transition: 'bottom top 2s',
});
