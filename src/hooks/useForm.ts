import { useState, useCallback, ChangeEvent } from 'react';
import { createFormState, ValidationResult } from '../utils/validation';

interface FormState {
    [key: string]: string | boolean;
}

type ValidationRule = (value: string) => ValidationResult;

interface ValidationRules {
    [key: string]: ValidationRule;
}

export const useForm = (
    initialFields: string[],
    validationRules: ValidationRules
) => {
    const [formState, setFormState] = useState<FormState>(createFormState(initialFields));

    const handleChange = useCallback((field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setFormState(prev => ({
            ...prev,
            [field]: value,
            [`${field}Error`]: false,
            [`${field}ErrorMessage`]: ''
        }));
    }, []);

    const validateField = useCallback((field: string, value: string | boolean) => {
        if (!validationRules[field]) return { isValid: true, message: '' };
        if (typeof value === 'boolean') return { isValid: true, message: '' };
        return validationRules[field](value);
    }, [validationRules]);

    const validateForm = useCallback(() => {
        const newState = { ...formState };
        let isValid = true;

        Object.keys(validationRules).forEach(field => {
            const validation = validateField(field, formState[field]);
            if (!validation.isValid) {
                newState[`${field}Error`] = true;
                newState[`${field}ErrorMessage`] = validation.message;
                isValid = false;
            }
        });

        setFormState(newState);
        return isValid;
    }, [formState, validateField, validationRules]);

    const resetForm = useCallback(() => {
        setFormState(createFormState(initialFields));
    }, [initialFields]);

    return {
        formState,
        handleChange,
        validateForm,
        setFormState,
        resetForm
    };
}; 