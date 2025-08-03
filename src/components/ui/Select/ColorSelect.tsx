import React from 'react';
import Select, { StylesConfig } from 'react-select';
import chroma from 'chroma-js';

export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
}

export const colourOptions: readonly ColourOption[] = [
    { value: 'Ocean', label: 'Ocean', color: '#00B8D9' },
    { value: 'Blue', label: 'Blue', color: '#0052CC' },
    { value: 'Purple', label: 'Purple', color: '#5243AA' },
    { value: 'Red', label: 'Red', color: '#FF5630' },
    { value: 'Orange', label: 'Orange', color: '#FF8B00' },
    { value: 'Yellow', label: 'Yellow', color: '#FFC400' },
    { value: 'Green', label: 'Green', color: '#36B37E' },
    { value: 'Forest', label: 'Forest', color: '#00875A' },
];

const dot = (color: string = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',
    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles: StylesConfig<ColourOption> = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'white',
    }),
    option: (
        styles,
        { data, isDisabled, isFocused, isSelected }
    ) => {
        const color = chroma(data.color);
        return {
            ...styles,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? data.color
                : isFocused
                ? color.alpha(0.1).css()
                : undefined,
            color: isDisabled
                ? '#ccc'
                : isSelected
                ? chroma.contrast(color, 'white') > 2
                    ? 'white'
                    : 'black'
                : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',
            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled
                    ? isSelected
                        ? data.color
                        : color.alpha(0.3).css()
                    : undefined,
            },
        };
    },
    input: (styles) => ({
        ...styles,
        ...dot(),
    }),
    placeholder: (styles) => ({
        ...styles,
        ...dot('#ccc'),
    }),
    singleValue: (styles, { data }) => ({
        ...styles,
        ...dot(data.color),
    }),
};

export interface ColorSelectProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

export const ColorSelect = ({
    selectedValue,
    onChange,
}: ColorSelectProps) => {
    const value =
        colourOptions.find((option) => option.value === selectedValue) || null;

    const handleChange = (option: any) => {
        onChange(option ? option.value : 'Red');
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={colourOptions}
            styles={colourStyles}
        />
    );
};
