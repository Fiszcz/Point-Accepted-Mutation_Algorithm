import * as React from 'react';
import {css} from "emotion";
import {theme} from "./theme";

export const StepPage: React.FC = ({children}) => {
    return <div className={stepPageStyle}>
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
});
