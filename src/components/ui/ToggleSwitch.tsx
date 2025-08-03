interface ToggleSwitchProps {
    isEnabled: boolean;
    onToggle: (enabled: boolean) => void;
    disabled?: boolean;
    size?: 'sm' | 'md' | 'lg';
    label?: string;
}

const ToggleSwitch = ({
    isEnabled,
    onToggle,
    disabled = false,
    size = 'md',
    label,
}: ToggleSwitchProps) => {
    const sizeClasses = {
        sm: 'w-8 h-5',
        md: 'w-10 h-6',
        lg: 'w-12 h-7',
    };

    const dotSizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    const dotPositionClasses = {
        sm: isEnabled ? 'translate-x-4' : 'translate-x-1',
        md: isEnabled ? 'translate-x-5' : 'translate-x-1',
        lg: isEnabled ? 'translate-x-6' : 'translate-x-1',
    };

    return (
        <div className='flex items-center gap-2'>
            {label && (
            <span className={`text-base font-light max-w-[100px] text-black`}>
                {label}
            </span>
        )}
            <button
                type='button'
                role='switch'
                aria-checked={isEnabled}
                disabled={disabled}
                onClick={() => onToggle(!isEnabled)}
                className={`
                    relative inline-flex items-center rounded-full transition-colors duration-200 ease-in-out
                    ${sizeClasses[size]}
                    ${disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                    ${isEnabled ? 'bg-black' : 'bg-gray-200'}
                    outline-none
                `}
            >
                <span
                    className={`
                        inline-block transform rounded-full bg-white shadow-lg transition-transform duration-200 ease-in-out
                        ${dotSizeClasses[size]}
                        ${dotPositionClasses[size]}
                    `}
                />
            </button>
        </div>
    );
};

export default ToggleSwitch;
