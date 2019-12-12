import * as React from 'react';
import { Typography } from './Typography';
import { css } from 'emotion';
import { theme } from './theme';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { useDispatch } from 'react-redux';
import { goToNextStep } from '../actions/steps/steps';

export const JumpToNextStep: React.FC = ({ children }) => {
    const dispatch = useDispatch();

    const handleNextStep = () => {
        dispatch(goToNextStep());
    };

    return (
        <div className={jumpToNextStepStyle} onClick={handleNextStep}>
            <Typography className={css({ color: theme.firstColor })}>{children}</Typography>
            <ExpandMore className={css({ fontSize: '50px !important', color: theme.firstColor })} />
        </div>
    );
};

const jumpToNextStepStyle = css({
    alignSelf: 'end',
    cursor: 'pointer',
    '&:hover > *': {
        textDecoration: 'underline',
    },
});
