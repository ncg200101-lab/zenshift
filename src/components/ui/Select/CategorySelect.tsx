import Select from 'react-select';
import type { ShiftTypes, CategoryTypes } from '../../../state/product/types'; 

export interface CategoryOption {
    readonly label: string;
    readonly value: string;
    readonly shift: string;
}

export const categoryOptions: readonly CategoryOption[] = [
    {
        label: 'Abundance Field',
        shift: 'Abundance',
        value: 'abundance-field',
    },
    {
        label: 'Books & Journals',
        shift: 'Abundance',
        value: 'books-journals',
    },
    {
        label: 'Digital Codes',
        shift: 'Abundance',
        value: 'digital-codes',
    },
    {
        label: 'Frequency Drops',
        shift: 'Abundance',
        value: 'frequency-drops',
    },
    {
        label: 'Apparel & Accessories',
        shift: 'Apothecary',
        value: 'apparel-accessories',
    },
    {
        label: 'Home Energy Tools',
        shift: 'Apothecary',
        value: 'home-energy-tools',
    },
    {
        label: 'Journals & Accessories',
        shift: 'Apothecary',
        value: 'journals-accessories',
    },
    {
        label: 'Mugs & Drinkware',
        shift: 'Apothecary',
        value: 'mugs-drinkware',
    },
    {
        label: 'Energetic Atmosphere',
        shift: 'Interior',
        value: 'energetic-atmosphere',
    },
    {
        label: 'Flow Mapping',
        shift: 'Interior',
        value: 'flow-mapping',
    },
    {
        label: 'Intentional Objects',
        shift: 'Interior',
        value: 'intentional-objects',
    },
    {
        label: 'Light & Tone',
        shift: 'Interior',
        value: 'light-tone',
    },
    {
        label: 'Energy Immune Flow',
        shift: 'Health',
        value: 'energy-immune-flow',
    },
    {
        label: 'Everyday Ascension Care',
        shift: 'Health',
        value: 'everyday-ascension-care',
    },
    {
        label: 'Gut & Mood Harmony',
        shift: 'Health',
        value: 'gut-mood-harmony',
    },
    {
        label: 'Nervous System Reset',
        shift: 'Health',
        value: 'nervous-system-reset',
    },
];

export interface CategorySelectProps {
    selectedShift: ShiftTypes;
    selectedValue: CategoryTypes;
    onChange: (value: string) => void;
}

export const CategorySelect = ({
    selectedShift,
    selectedValue,
    onChange,
}: CategorySelectProps) => {
    // Filter options based on selectedShift
    const filteredOptions: CategoryOption[] = categoryOptions
        .filter((item: CategoryOption) => item.shift === selectedShift);

    const value =
        filteredOptions.find((option) => option.value === selectedValue) || null;

    const handleChange = (option: any) => {
        onChange(option ? option.value : (filteredOptions[0]?.value || ''));
    };

    return (
        <Select
            value={value}
            onChange={handleChange}
            options={filteredOptions}
        />
    );
};
