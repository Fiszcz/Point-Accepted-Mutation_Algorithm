import * as React from 'react';
import { css, cx } from 'emotion';
import { theme } from './theme';

interface StepPageProps {
    className?: string;
}

export const StepPage: React.FC<StepPageProps> = ({ children, className }) => {
    return <div className={cx(stepPageStyle, className)}>{children}</div>;
};

const stepPageStyle = css({
    position: 'absolute',
    top: 30,
    bottom: 30,
    left: 30,
    right: 30,
    backgroundColor: theme.thirdColor,
    color: theme.secondaryColor,
    textAlign: 'center',
    display: 'flex',
    border: `3px solid ${theme.firstColor}`,
    transition: 'bottom top 2s',
});
