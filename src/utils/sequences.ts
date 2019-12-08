function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateRandomSequences = () => {
    const numberRandomSequences = randomIntFromInterval(6, 10);
    const lengthOfSequences = randomIntFromInterval(6, 13);

    let theMostPossibleCharacters = '';
    for (let i = 0; i < lengthOfSequences; i++) {
        theMostPossibleCharacters += possibleCharacters[randomIntFromInterval(0, possibleCharacters.length-1)];
    }

    const sequences = [];
    for (let i = 0; i < numberRandomSequences; i++) {
        let sequence = '';
        for (let n = 0; n < lengthOfSequences; n++) {
            sequence += Math.random() > 0.7 ? possibleCharacters[randomIntFromInterval(0, possibleCharacters.length-1)] : theMostPossibleCharacters[n];
        }
        sequences.push(sequence);
    }

    return sequences;
};

export const countSubstitutionsBetweenSequences = (firstSequence: string, secondSequence: string) => {
    let substitutions = 0;
    for (let char = 0; char < firstSequence.length; char++){
        if (firstSequence[char] !== secondSequence[char])
            substitutions++;
    }
    return substitutions;
};
