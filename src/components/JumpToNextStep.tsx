import * as React from 'react';
import { Typography } from './Typography';
import { css } from 'emotion';
import { theme } from './theme';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useDispatch } from 'react-redux';
import { goToNextStep } from '../actions/steps/steps';

interface JumpToNextStepProps {
    disabled?: boolean;
}

export const JumpToNextStep: React.FC<JumpToNextStepProps> = ({ children, disabled }) => {
    const dispatch = useDispatch();

    const handleNextStep = () => {
        dispatch(goToNextStep());
    };

    return (
        <div className={jumpToNextStepStyle(disabled)} onClick={!disabled ? handleNextStep : () => {}}>
            <Typography className={contentStyle(disabled)}>{children}</Typography>
            <ExpandMore className={expandMoreIconStyle(disabled)} />
        </div>
    );
};

const contentStyle = (disabled?: boolean) =>
    css({
        color: disabled ? theme.secondaryColor : theme.firstColor,
    });

const expandMoreIconStyle = (disabled?: boolean) =>
    css({
        fontSize: '50px !important',
        color: disabled ? theme.secondaryColor : theme.firstColor,
    });

const jumpToNextStepStyle = (disabled?: boolean) =>
    css({
        alignSelf: 'end',
        cursor: 'pointer',
        '&:hover > *': disabled
            ? {}
            : {
                  textDecoration: 'underline',
              },
    });
