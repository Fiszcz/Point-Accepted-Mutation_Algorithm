import * as React from 'react';
import {Typography} from "./Typography";
import {css} from "emotion";
import {theme} from "./theme";
import ExpandMore from '@material-ui/icons/ExpandMore';

export const JumpToNextStep: React.FC = ({children}) => {
    return <div className={jumpToNextStepStyle}>
        <Typography className={css({color: theme.firstColor})}>{children}</Typography>
        <ExpandMore className={css({fontSize: '50px !important', color: theme.firstColor})}/>
    </div>
};

const jumpToNextStepStyle = css({
    alignSelf: 'end',
});