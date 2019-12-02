import * as React from 'react';
import {css, cx} from "emotion";

type typographyVariants = 'title' | 'headTitle' | 'subtitle' | 'text';

type typographyWeightVariants = 'bold' | 'normal' | 'light';

interface TypographyProps {
    variant?: typographyVariants;
    size?: number;
    weight?: typographyWeightVariants;

    className?: string;
}

export const Typography: React.FC<TypographyProps> = ({variant = 'text', size, weight, children, className}) => {
    return <p className={cx(typographyStyle, typographyVariantStyles[variant], size ? typographySizeStyle(size) : '', weight ? typographyWeightStyle[weight] : '', className)}>
        {children}
    </p>
};

const typographyStyle = css({
    margin: 0,
});

const typographyVariantStyles = {
    title: css({
        fontFamily: 'Georgia, serif',
        fontSize: 40,
    }),
    headTitle: css({
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 22,
        weight: 'bold',
    }),
    text: css({
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 15,
    }),
    subtitle: css({
        fontWeight: 'bold',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: 15,
    }),
};

const typographySizeStyle = (size: number) => css({fontSize: size});

const typographyWeightStyle = {
    bold: css({
        fontWeight: 'bold',
    }),
    normal: css({
        fontWeight: 'normal',
    }),
    light: css({
        fontWeight: 'lighter',
    }),
};
