import * as React from 'react';
import { Typography } from '../../components/Typography';
import { css } from 'emotion';
import { theme } from '../../components/theme';

interface GenerateButtonProps {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({ onClick }) => {
    return (
        <button className={generateButtonStyle} onClick={onClick}>
            <Typography weight={'bold'} size={14}>
                WYGENERUJ SEKWENCJE
            </Typography>
        </button>
    );
};

const generateButtonStyle = css({
    backgroundColor: 'transparent',
    border: `2px solid ${theme.firstColor}`,
    borderRadius: '4px',
    color: theme.firstColor,
    padding: '14px 16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    '&:hover': {
        backgroundColor: '#2699fb21',
    },
});
