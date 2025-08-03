import { useState, useRef, useEffect, forwardRef, KeyboardEvent } from 'react';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps {
    options: SelectOption[];
    value?: string;
    onChange?: (value: string) => void;
    prefix?: string;
    placeholder?: string;
    isShowArrow?: boolean;
    disabled?: boolean;
    parentClassName?: string;
    className?: string;
}

export const Select = forwardRef<HTMLDivElement, SelectProps>(
    ({ options, value, onChange, prefix = '', placeholder = 'Select an option', isShowArrow = false, disabled = false, parentClassName, className }, ref) => {
        const [isOpen, setIsOpen] = useState<boolean>(false);
        const [selectedOption, setSelectedOption] = useState<SelectOption | undefined>(
            options.find((option) => option.value === value)
        );

        const selectRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const handleClickOutside = (event: MouseEvent) => {
                if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                }
            };

            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }, []);

        const handleSelect = (option: SelectOption) => {
            setSelectedOption(option);
            onChange?.(option.value);
            setIsOpen(false);
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (disabled) return;

            switch (event.key) {
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    setIsOpen(!isOpen);
                    break;
                case 'Escape':
                    setIsOpen(false);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        const currentIndex = options.findIndex((opt) => opt.value === selectedOption?.value);
                        const nextIndex = (currentIndex + 1) % options.length;
                        handleSelect(options[nextIndex]);
                    }
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    if (!isOpen) {
                        setIsOpen(true);
                    } else {
                        const currentIndex = options.findIndex((opt) => opt.value === selectedOption?.value);
                        const prevIndex = (currentIndex - 1 + options.length) % options.length;
                        handleSelect(options[prevIndex]);
                    }
                break;
            }
        };

        return (
            <div
                ref={selectRef}
                className={`relative w-fit z-[100] ${parentClassName}`}
                role='combobox'
                aria-expanded={isOpen}
                aria-haspopup='listbox'
                aria-controls='select-options'
            >
                <div
                    ref={ref}
                    tabIndex={disabled ? -1 : 0}
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    onKeyDown={handleKeyDown}
                    className={`flex items-center justify-between px-3 md:px-5 py-2 md:py-3 text-lg border rounded-full cursor-pointer\
                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500\
                        border-black text-[#747474]\
                        ${disabled ? 'opacity-50 cursor-not-allowed': ''} ${className}`}
                >
                    <span className='block truncate'>
                        {selectedOption ? prefix + selectedOption.label : placeholder}
                    </span>
                    {isShowArrow && <div className={`w-5 h-5 transition-transform duration-200 ${isOpen && 'transform rotate-180'}`}>
                        <svg className='w-full h-full' viewBox='0 0 39 35' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <path d='M23.8301 32.5C21.9056 35.8333 17.0944 35.8333 15.1699 32.5L0.880459 7.75001C-1.04404 4.41667 1.36158 0.25 5.21058 0.25H33.7894C37.6384 0.25 40.044 4.41667 38.1195 7.75L23.8301 32.5Z' fill='black' />
                        </svg>
                    </div>}
                </div>

                {isOpen && (
                    <div
                        id='select-options'
                        role='listbox'
                        className='absolute z-[10] w-full mt-2 py-4 bg-[#faf5e8] border border-gray-300 rounded-3xl shadow-lg max-h-60 overflow-auto'
                    >
                        {options.map((option) => (
                        <div
                            key={option.value}
                            role='option'
                            aria-selected={option.value === selectedOption?.value}
                            onClick={() => handleSelect(option)}
                            className={`px-3 py-2 text-base cursor-pointer text-left hover:bg-[#f5e9c9] ${option.value === selectedOption?.value ? 'bg-[#f3e4bc]': 'bg-[#faf5e8]'}`}
                        >
                            {option.label}
                        </div>
                        ))}
                    </div>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
