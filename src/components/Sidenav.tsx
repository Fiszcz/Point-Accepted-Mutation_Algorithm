import * as React from 'react';
import {css} from "emotion";
import {theme} from "./theme";
import {Typography} from "./Typography";
import {Navigation} from "./Navigation";
import {Authors} from "./Authors";

export const Sidenav: React.FC = () => {
    return <div className={sidenavStyle}>
        <Typography className={css({margin: '30px 0'})}>
            PAM <br/> Program demonstracyjny
        </Typography>
        <Navigation/>
        <Authors/>
    </div>;
};

const sidenavStyle = css({
    backgroundColor: theme.firstColor,
    height: '100%',
    overflowY: 'hidden',
    color: 'white',
    padding: '0 25px',
});
