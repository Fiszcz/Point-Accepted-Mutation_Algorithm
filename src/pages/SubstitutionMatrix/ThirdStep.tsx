import * as React from 'react';
import {Typography} from "../../components/Typography";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import {css} from "emotion";
const Latex = require('react-latex');

export const ThirdStep = () => {
    const numberOfAllSubstitutions = useSelector((state: AppState) => state.substitutionMatrix.numberOfAllSubstitutions);
    const lengthOfAllSequences = useSelector((state: AppState) => state.substitutionMatrix.lengthOfAllSequences);
    const lambda = useSelector((state: AppState) => state.substitutionMatrix.lambda);

    return <div className={css({width: '100%'})}>
        <div>
            <Typography variant={"subtitle"}>Wzór na wartość Lamda:</Typography>
            <br/>
            <div className={css({'& > *': {fontSize: 30}})}>
            {React.createElement(Latex, null, "\$\\lambda = 0.01 \\frac {N} {\\sum\\sum A_{ij}}$")}
            </div>
            <br/>
            <br/>
            <div className={css({'& > *': {fontSize: 15}})}>
            {React.createElement(Latex, null, "Liczba wszystkich symboli: \$N = " + lengthOfAllSequences + "$")}
            </div>
            <div className={css({'& > *': {fontSize: 15}})}>
            {React.createElement(Latex, null, "Liczba wszystkich substytucji: \$\\sum\\sum A_{ij} = " + numberOfAllSubstitutions + "$")}
            </div>
            <br/>
            <div className={css({'& > *': {fontSize: 25}})}>
            {React.createElement(Latex, null, "\$\\Downarrow$")}
            </div>
            <br/>
            <div className={css({'& > *': {fontSize: 30}})}>
            {React.createElement(Latex, null, "\$\\lambda = 0.01 \\frac {" + lengthOfAllSequences + "} {" + numberOfAllSubstitutions + "}$")}
            </div>
            <br/>
            <div className={css({'& > *': {fontSize: 25}})}>
                {React.createElement(Latex, null, "\$\\Downarrow$")}
            </div>
            <br/>
            <div className={css({'& > *': {fontSize: 30}})}>
                {React.createElement(Latex, null, "\$\\lambda = " + lambda.toFixed(4) + "$")}
            </div>
        </div>
    </div>;
};
