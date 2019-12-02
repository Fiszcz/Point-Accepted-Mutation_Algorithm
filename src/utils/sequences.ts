function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const generateRandomSequences = () => {
    const numberRandomSequences = randomIntFromInterval(6, 10);
    const lengthOfSequences = randomIntFromInterval(6, 13);

    const sequences = [];
    for (let i = 0; i < numberRandomSequences; i++) {
        let sequence = '';
        for (let n = 0; n < lengthOfSequences; n++) {
            sequence += possibleCharacters[randomIntFromInterval(0, possibleCharacters.length-1)];
        }
        sequences.push(sequence);
    }

    return sequences;
};
