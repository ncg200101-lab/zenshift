import Select from 'react-select';

export interface FitOption {
    readonly value: string;
    readonly label: string;
}

export const fitOptions: readonly FitOption[] = [
    { value: 'Slim', label: 'Slim' },
    { value: 'Regular', label: 'Regular' },
    { value: 'Relaxed', label: 'Relaxed' },
];


export interface FitSelectProps {
    selectedValue: string;
    onChange: (value: string) => void;
}

export const FitSelect = ({
    selectedValue,
    onChange,
}: FitSelectProps) => {
    const value =
        fitOptions.find((option) => option.value === selectedValue) || null;

    const handleChange = (option: any) => {
        onChange(option ? option.value : 'Slim');
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={fitOptions}
        />
    );
};
