import * as React from 'react';
import {Typography} from "./Typography";
import {css} from "emotion";

export const Authors = () => {
    return <div className={css({position: 'absolute', bottom: 30})}>
        <Typography>
            # Filip Szcześniak
        </Typography>
        <Typography size={15}>
            fiszczu@gmail.com
        </Typography>
        <br/>
        <Typography>
            # Agnieszka Dąbrowska
        </Typography>
        <Typography size={15}>
            agniecha@gmail.com
        </Typography>
    </div>;
};
