import * as React from 'react';
import { Typography } from './Typography';
import { css } from 'emotion';
import { theme } from './theme';
import { ArrowLeft } from '@material-ui/icons';

interface NextStepProps {
    onClick: () => any;
}

export const PreviousStep: React.FC<NextStepProps> = ({ onClick }) => {
    return (
        <div className={jumpToNextStepStyle} onClick={onClick}>
            <ArrowLeft className={css({ fontSize: '50px !important', color: theme.firstColor })} />
            <Typography className={css({ color: theme.firstColor })}>Poprzedni krok</Typography>
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
    marginRight: '15px',
});
