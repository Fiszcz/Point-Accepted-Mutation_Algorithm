import * as React from 'react';
import { Typography } from './Typography';
import { css } from 'emotion';
import { theme } from './theme';
import { ArrowRight } from '@material-ui/icons';

interface NextStepProps {
    onClick: () => any;
}

export const NextStep: React.FC<NextStepProps> = ({ onClick }) => {
    return (
        <div className={jumpToNextStepStyle} onClick={onClick}>
            <Typography className={css({ color: theme.firstColor })}>Następny krok</Typography>
            <ArrowRight className={css({ fontSize: '50px !important', color: theme.firstColor })} />
        </div>
    );
};

const jumpToNextStepStyle = css({
    alignSelf: 'end',
    cursor: 'pointer',
    '&:hover > *': {
        textDecoration: 'underline',
    },
    display: 'flex',
    alignItems: 'center',
});
