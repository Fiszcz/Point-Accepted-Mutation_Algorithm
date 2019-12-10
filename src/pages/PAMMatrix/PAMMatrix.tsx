import * as React from 'react';
import {useSelector} from "react-redux";
import {AppState} from "../../store";

export const PamMatrix = () => {
    const PAM1Matrix = useSelector((state: AppState) => state.substitutionMatrix.PAM1Matrix);
    const uniqueListOfSymbols = useSelector((state: AppState) => state.substitutionMatrix.uniqueListOfSymbols);

    return <div>

    </div>;
};
