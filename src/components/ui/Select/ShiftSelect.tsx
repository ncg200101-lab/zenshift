import Select from 'react-select';

export interface ShiftOption {
    readonly value: string;
    readonly label: string;
}

export const shiftOptions: readonly ShiftOption[] = [
    { value: 'Abundance', label: 'Abundance' },
    { value: 'Apothecary', label: 'Apothecary' },
    { value: 'Interior', label: 'Interior' },
    { value: 'Health', label: 'Health' },
    // { value: 'Kids', label: 'Kids' },
    // { value: 'Masters', label: 'Masters' },
    // { value: 'Travels', label: 'Travels' },
    // { value: 'Academy', label: 'Academy' },
    // { value: 'Collectives', label: 'Collectives' },
    // { value: 'Golf', label: 'Golf' },
];


export interface ShiftSelectProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

export const ShiftSelect = ({
    selectedValue,
    onChange,
}: ShiftSelectProps) => {
    const value =
        shiftOptions.find((option) => option.value === selectedValue) || null;

    const handleChange = (option: any) => {
        onChange(option ? option.value : 'Abundance');
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={shiftOptions}
        />
    );
};
