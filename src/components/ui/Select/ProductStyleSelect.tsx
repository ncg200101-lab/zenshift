import Select from 'react-select';

export interface StyleOption {
    readonly value: string;
    readonly label: string;
}

export const styleOptions: readonly StyleOption[] = [
    { value: 'Modern', label: 'Modern' },
    { value: 'Rustic', label: 'Rustic' },
    { value: 'Minimalist', label: 'Minimalist' },
];

export interface ProductStyleSelectProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

export const ProductStyleSelect = ({
    selectedValue,
    onChange,
}: ProductStyleSelectProps) => {
    const value =
        styleOptions.find((option) => option.value === selectedValue) || null;

    const handleChange = (option: any) => {
        onChange(option ? option.value : 'Modern');
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={styleOptions}
        />
    );
};
