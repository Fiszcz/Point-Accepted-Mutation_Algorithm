import * as React from 'react';
import { Typography } from '../../components/Typography';
import { css } from 'emotion';
import { JumpToNextStep } from '../../components/JumpToNextStep';

export const IntroductionPage = () => {
    return (
        <div className={introductionPageStyle}>
            <div>
                <Typography variant={'title'}>Program demonstracyjny - PAM</Typography>
                <Typography className={css({ marginTop: 10 })}>
                    Projekt realizowany w ramach zajęć Metod Bioinformatycznych
                    <br />
                    2019
                </Typography>
            </div>

            <div>
                <Typography variant={'subtitle'} size={22}>
                    Macierz punktowania substytucji aminokwasowych
                </Typography>
                <Typography variant={'headTitle'}>
                    Odzwierciedlają prawdopodobieństwo substytucji aminokwasowych
                    <br />
                    (podstawienia jednej pary zasad przez inną).
                </Typography>
            </div>
            <div>
                <Typography variant={'subtitle'} size={22}>
                    Macierz PAM
                </Typography>
                <Typography variant={'headTitle'}>
                    Jest empiryczną macierzą punktowania substytucji aminokwasowych.
                    <br />
                    Tworzona jest na podstawie przyrównań wysoce podobnych sekwencji.
                    <br />
                    Analizując prawdopodobieństwo substytucji w tych przyrównaniach opracowywany jest system punktacji, nadający wysokie
                    wartości ocen substytucjom bardziej prawdopodobnym, a niskie - substytucjom występującym rzadziej.
                </Typography>
            </div>

            <div className={css({ display: 'flex' })}>
                <Typography size={23} weight={'bold'} className={authorTypography}>
                    Agnieszka Dąbrowska
                </Typography>
                <Typography size={23} weight={'bold'} className={authorTypography}>
                    Filip Szcześniak
                </Typography>
            </div>

            <JumpToNextStep>Przejdź do algorytmu</JumpToNextStep>
        </div>
    );
};

const authorTypography = css({
    padding: 20,
});

const introductionPageStyle = css({
    display: 'grid',
    justifyItems: 'center',
    alignItems: 'center',
    padding: '5% 10%',
});
