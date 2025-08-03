import Select from 'react-select';

export interface SizeOption {
    readonly value: string;
    readonly label: string;
}

export const sizeOptions: readonly SizeOption[] = [
    { value: 'XS', label: 'Extra Small' },
    { value: 'S', label: 'Small' },
    { value: 'M', label: 'Medium' },
    { value: 'L', label: 'Large' },
    { value: 'XL', label: 'Extra Large' },
];


export interface SizeSelectProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

export const SizeSelect = ({
    selectedValue,
    onChange,
}: SizeSelectProps) => {
    const value =
        sizeOptions.find((option) => option.value === selectedValue) || null;

    const handleChange = (option: any) => {
        onChange(option ? option.value : 'XS');
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={sizeOptions}
        />
    );
};
